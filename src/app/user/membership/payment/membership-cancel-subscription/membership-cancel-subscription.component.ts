import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { PaymentService } from 'src/app/service/payment.service';
import { Membership } from 'src/app/shared/membership';

@Component({
  selector: 'app-membership-cancel-subscription',
  templateUrl: './membership-cancel-subscription.component.html',
  styleUrls: [
    '../common-payment.scss',
    './membership-cancel-subscription.component.scss',
  ],
})
export class MembershipCancelSubscriptionComponent implements OnInit {
  loading: boolean;
  errorMessage: any;
  membership: Membership;
  user: any = null;
  token: string = '';

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private paymentService: PaymentService
  ) {
    this.loading = false;
    this.membership = {} as Membership;
  }

  public ngOnInit(): void {
    this.loading = false;
    this.errorMessage = null;
    this.cognitoService
      .getUser()
      .then((user: any) => {
        this.user = user;
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

  public cancelSubscription(): void {
    this.loading = true;
    this.paymentService
      .cancelSubscription(this.token, this.membership.subscriptionId)
      .subscribe((result) => {
        const canceledSubscription = result;

        if (canceledSubscription.status === 'canceled') {
          this.updateMembership(canceledSubscription);
        } else {
          this.loading = false;
          this.errorMessage = 'Subscription cancelation is failed.';
        }
      });
  }

  public updateMembership(result: any): void {
    this.membership.subscriptionStatus = 'canceled';

    if (!this.membership.paymentHistory) this.membership.paymentHistory = [];

    this.membership.paymentHistory.push({
      date: new Date(),
      action: 'CancelSubscription',
      description:
        'The regular membership subscription (' + result.id + ') is canceled.',
      amounts: 0,
    });

    this.membershipService
      .createMembership(this.membership, this.token)
      .subscribe(() => {
        this.loading = false;
        this.router.navigate(['/profile/Membership-Information']);
      });
  }
}
