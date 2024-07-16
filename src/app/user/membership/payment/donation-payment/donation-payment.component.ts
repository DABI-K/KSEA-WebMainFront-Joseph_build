import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { CognitoService } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { PaymentService } from 'src/app/service/payment.service';
import { Membership } from 'src/app/shared/membership';

@Component({
  selector: 'app-donation-payment',
  templateUrl: './donation-payment.component.html',
  styleUrls: ['../common-payment.scss', './donation-payment.component.scss'],
})
export class DonationPaymentComponent implements OnInit {
  paymentHandler: any = null;
  loading: boolean;
  errorMessage: any;
  membership: Membership;
  amount: number;
  user: any = null;
  token: string = '';

  existSubscription: any;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private paymentService: PaymentService,
    private stripeService: StripeService
  ) {
    this.loading = false;
    this.amount = 100;
    this.membership = {} as Membership;
  }

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };

  public ngOnInit(): void {
    this.amount = 100;
    this.loading = false;
    this.errorMessage = null;
    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
        const newMemberShip: Membership = {} as Membership;
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;
          this.membershipService
            .getMembership(user.username, this.token)
            .subscribe((data: any) => {
              this.membership = data.Item;

              if (!this.membership) {
                this.membership = {} as Membership;
                this.membership.id = user.username;
                this.membership.type = 'Unpaid';
                this.membership.email = user.attributes.email;
              }

              if (!this.membership.customerId) {
                this.paymentService
                  .createCustomer(
                    user.username,
                    user.attributes.email,
                    this.token
                  )
                  .subscribe((customerData: any) => {
                    this.membership.customerId = customerData.id;
                    this.membershipService
                      .createMembership(this.membership, this.token)
                      .subscribe();
                  });
              }
            });
        });
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  public cancel(): void {
    this.router.navigate(['/profile/Membership-Information']);
  }

  makePayment() {
    this.loading = true;
    if (this.membership && this.membership.customerId) {
      this.stripeService
        .createToken(this.card.element, { name: this.user.username })
        .subscribe((result) => {
          if (result.token) {
            this.errorMessage = null;
            this.paymentService
              .payOnetime(
                result.token.id,
                this.amount,
                this.user.attributes.email,
                this.token,
                this.user.username + "'s Donation paid: $" + this.amount,
                this.membership.customerId
              )
              .subscribe({
                next: (paymentResult: any) => {
                  const result = paymentResult;
                  if (result.status === 'succeeded') {
                    this.updateMembership(result);
                  } else {
                    this.errorMessage = 'The payment is failed.';
                  }
                },
                error: (error) => {
                  this.loading = false;
                  alert(error.error);
                  console.log('oops', error);
                },
              });
          } else if (result.error) {
            this.loading = false;
            this.errorMessage = result.error.message;
          }
        });
    }
  }

  public updateMembership(result: any): void {
    if (!this.membership.paymentHistory) this.membership.paymentHistory = [];

    this.membership.paymentHistory.push({
      date: new Date(),
      action: 'PayDonation',
      description: 'Donation paid (' + result.id + ')',
      amounts: this.amount,
    });

    this.membershipService
      .createMembership(this.membership, this.token)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/profile/Membership-Information']);
      });
  }
}
