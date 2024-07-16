import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService, IUser } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { PaymentService } from 'src/app/service/payment.service';
import { Membership, PaymentHistoryItem } from 'src/app/shared/membership';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: [
    '../profile//profile.component.scss',
    './membership.component.scss',
  ],
})
export class MembershipComponent implements OnInit {
  loading: boolean;
  errorMessage: any;
  membership: Membership;
  token: string = '';
  currentSubscription: any;

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
    this.cognitoService
      .getUser()
      .then((user: any) => {
        if (user) {
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

                if (!this.membership.type) this.membership.type = 'Unpaid';

                if (this.membership.paymentHistory) {
                  this.membership.paymentHistory =
                    this.membership.paymentHistory.sort(
                      (a: PaymentHistoryItem, b: PaymentHistoryItem) => {
                        return (
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                        );
                      }
                    );
                }

                if (this.membership.subscriptionId) {
                  this.paymentService
                    .retrieveSubscription(
                      this.token,
                      this.membership.subscriptionId
                    )
                    .subscribe((result) => {
                      this.currentSubscription = result;
                      if (
                        this.currentSubscription.status &&
                        this.currentSubscription.status === 'trialing'
                      ) {
                        this.currentSubscription.status = 'active';
                      }
                    });
                }
              });
          });
        } else {
          this.router.navigate(['/signIn']);
        }
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  public backToProfile(): void {
    this.router.navigate(['/profile']);
  }

  public calLifeTimeFee(): number {
    if (
      this.membership &&
      this.membership.numberOfPayments &&
      this.membership.numberOfPayments > 0 &&
      this.membership.numberOfPayments > 5
    ) {
      if ((20 - this.membership.numberOfPayments) * 35 < 0) return 0;
      else return (20 - this.membership.numberOfPayments) * 35;
    }
    return 35 * 15;
  }

  public payRegularMember(): void {
    this.router.navigate(['/membershipRegularPayment']);
  }

  public paySchoolMember(): void {
    this.router.navigate(['/membershipSchoolPayment']);
  }

  public payLifeTime(): void {
    this.router.navigate(['/membershipLifetimePayment']);
  }

  public donateKSEA(): void {
    this.router.navigate(['/donation']);
  }

  public cancelSubscription(): void {
    this.router.navigate(['/membershipCancelSubscription']);
  }

  public changePaymentMethod(): void {
    this.router.navigate(['/membershipChangePaymentMethod']);
  }

  public resumeSubscription(): void {
    this.router.navigate(['/membershipResumeSubscription']);
  }

  public isExpired(expirationDate: any): boolean {
    if (expirationDate) {
      const expirationDateNum = new Date(expirationDate).getTime();
      const todayNum = new Date().getTime();

      if (todayNum > expirationDateNum) return true;
      else return false;
    }
    return true;
  }
}
