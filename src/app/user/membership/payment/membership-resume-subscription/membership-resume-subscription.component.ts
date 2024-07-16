import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { PaymentService } from 'src/app/service/payment.service';
import { Membership } from 'src/app/shared/membership';

@Component({
  selector: 'app-membership-resume-subscription',
  templateUrl: './membership-resume-subscription.component.html',
  styleUrls: [
    '../common-payment.scss',
    './membership-resume-subscription.component.scss',
  ],
})
export class MembershipResumeSubscriptionComponent implements OnInit {
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
                this.membership.subscriptionStatus !== 'canceled'
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

  public resumeSubscription(): void {
    this.loading = true;
    this.paymentService
      .reactiveSubscription(
        this.token,
        this.membership.subscriptionId,
        this.membership.customerId
      )
      .subscribe((result) => {
        const reactivedSubscription = result;
        console.log(reactivedSubscription);
        if (reactivedSubscription.status === 'trialing') {
          this.updateMembership(reactivedSubscription);
        } else {
          this.loading = false;
          this.errorMessage = 'Subscription reactivation is failed.';
        }
      });
  }

  public updateMembership(result: any): void {
    this.membership.subscriptionStatus = 'subscribed';

    if (!this.membership.paymentHistory) this.membership.paymentHistory = [];

    this.membership.subscriptionId = result.id;
    this.membership.paymentHistory.push({
      date: new Date(),
      action: 'ResumeSubscription',
      description:
        'The regular membership resumed: changed subscription ID (' +
        result.id +
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
