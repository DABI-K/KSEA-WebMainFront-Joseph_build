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
  selector: 'app-membership-change-payment-method',
  templateUrl: './membership-change-payment-method.component.html',
  styleUrls: [
    '../common-payment.scss',
    './membership-change-payment-method.component.scss',
  ],
})
export class MembershipChangePaymentMethodComponent implements OnInit {
  paymentHandler: any = null;
  loading: boolean;
  errorMessage: any;
  membership: Membership;
  user: any = null;
  token: string = '';

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
              if (
                !this.membership ||
                !this.membership.customerId ||
                !this.membership.subscriptionId ||
                this.membership.type !== 'Regular' ||
                this.membership.subscriptionStatus !== 'subscribed'
              ) {
                this.router.navigate(['/profile/Membership-Information']);
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

  public updateSubscription() {
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
              if (
                resCus.id &&
                result.paymentMethod &&
                result.paymentMethod.card &&
                result.paymentMethod.card.last4
              ) {
                this.updateMembership(result.paymentMethod);
              } else {
                this.loading = false;
                this.errorMessage = 'Something wrong.';
              }
            });
        } else if (result.error) {
          this.loading = false;
          this.errorMessage = result.error.message;
        }
      });
  }

  public updateMembership(result: any): void {
    if (!this.membership.paymentHistory) this.membership.paymentHistory = [];

    this.membership.paymentHistory.push({
      date: new Date(),
      action: 'ChangeSubscriptionPaymentMethod',
      description:
        'The payment method changed (' +
        result.card.last4 +
        ') for subscription (' +
        this.membership.subscriptionId +
        ')',
      amounts: 0,
    });

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
