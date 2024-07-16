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
  selector: 'app-membership-regular-payment',
  templateUrl: './membership-regular-payment.component.html',
  styleUrls: [
    '../common-payment.scss',
    './membership-regular-payment.component.scss',
  ],
})
export class MembershipRegularPaymentComponent implements OnInit {
  paymentHandler: any = null;
  loading: boolean;
  errorMessage: any;
  membership: Membership;
  user: any = null;
  token: string = '';
  nextYearDate: Date = new Date();

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private paymentService: PaymentService,
    private stripeService: StripeService
  ) {
    this.loading = false;
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
    this.loading = false;
    this.errorMessage = null;
    this.nextYearDate = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );
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
                  .subscribe((customerData) => {
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

  makeSubscription() {
    this.loading = true;
    this.stripeService
      .createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: { name: this.user.username },
      })
      .subscribe((result) => {
        if (result.paymentMethod) {
          this.paymentService
            .updateSubscription(
              result.paymentMethod.id,
              this.token,
              this.membership.customerId
            )
            .subscribe((updatedCustomer) => {
              const resCus = updatedCustomer;
              if (resCus.id) {
                this.paymentService
                  .createRegular35Subscription(
                    this.token,
                    this.membership.customerId
                  )
                  .subscribe({
                    next: (subsResult) => {
                      const resSubs = subsResult;
                      if (
                        resSubs &&
                        resSubs.status &&
                        resSubs.status === 'active'
                      ) {
                        this.updateMembership(resSubs);
                      } else if (
                        resSubs &&
                        resSubs.status &&
                        resSubs.status !== 'active'
                      ) {
                        this.loading = false;
                        this.errorMessage =
                          'Subscription status: ' + resSubs.status;
                      } else {
                        this.loading = false;
                        this.errorMessage = 'Subscription is failed';
                      }
                    },
                    error: (error) => {
                      this.loading = false;
                      alert(error.error);
                      console.log('oops', error);
                    },
                  });
              }
            });
        } else if (result.error) {
          this.loading = false;
          this.errorMessage = result.error.message;
        }
      });
  }

  public updateMembership(result: any): void {
    this.membership.type = 'Regular';
    this.membership.expirationDate = this.nextYearDate;
    if (this.membership.numberOfPayments)
      this.membership.numberOfPayments =
        Number(this.membership.numberOfPayments) + 1;
    else this.membership.numberOfPayments = 1;
    this.membership.subscriptionId = result.id;
    this.membership.subscriptionStatus = 'subscribed';

    if (!this.membership.paymentHistory) this.membership.paymentHistory = [];

    this.membership.paymentHistory.push({
      date: new Date(),
      action: 'PayRegularMembership',
      description: 'Regular membership fully paid (' + result.id + ')',
      amounts: 35,
    });

    this.membership.lifetimeDate = undefined;
    this.membership.schoolInfo = undefined;

    this.cognitoService.getToken().then((sdata) => {
      const token = sdata.accessToken.jwtToken;
      this.membershipService
        .createMembership(this.membership, token)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/profile/Membership-Information']);
        });
    });
  }
}
