import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from 'src/app/service/cognito.service';
import { MembershipService } from 'src/app/service/membership.service';
import { UserInfoService } from 'src/app/service/user-info.service';
import { Membership } from 'src/app/shared/membership';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user: IUser;
  scrolled = false;
  token: string = '';
  userInfo: any;
  membership: Membership;
  mobileToggle = false;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private membershipService: MembershipService,
    private userInfoService: UserInfoService
  ) {
    this.user = {} as IUser;
    this.membership = {} as Membership;
  }

  public ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
      if (this.user) {
        this.cognitoService.getToken().then((sdata) => {
          this.token = sdata.accessToken.jwtToken;
          this.userInfoService
            .getUserInfo(user.username, this.token)
            .subscribe((uData: any) => {
              this.userInfo = uData.Item;
            });
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
            });
        });
      }
    });
    // this.cognitoService
    //   .getCurrentUset()
    //   .then((user: any) => {
    //     this.user = user;
    //   })
    //   .catch(() => {});
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.user = {} as IUser;
      this.router.navigate(['/']);
    });
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 500;
  }
}
