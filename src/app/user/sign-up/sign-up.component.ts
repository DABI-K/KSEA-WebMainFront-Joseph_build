import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../../service/cognito.service';
import { UserInfoService } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../css/common-user.scss', './sign-up.component.scss'],
})
export class SignUpComponent {
  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  errorMessage: any;

  constructor(private router: Router, private cognitoService: CognitoService, private userInfoService: UserInfoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.errorMessage = null;
  }

  public ngOnInit(): void {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.errorMessage = null;
  }

  public signUp(): void {
    console.log(this.user);
    this.loading = true;
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
        this.errorMessage = null;
      })
      .catch((e) => {
        this.loading = false;
        this.errorMessage = e.message;
      });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        let newUserInfo:any = {};
        newUserInfo.id = this.user.username.toLowerCase();
        newUserInfo.email = this.user.email;
        newUserInfo.currentJob = {};
        newUserInfo.educationInfo = [];
        newUserInfo.jobHistory = [];
        newUserInfo.kseaInfo = {};
        newUserInfo.userInfo = {};
        newUserInfo.userInfo.family_name = this.user.family_name;
        newUserInfo.userInfo.given_name = this.user.given_name;
        newUserInfo.userInfo.address = this.user.address;
        newUserInfo.userInfo.city = this.user['custom:city'];
        newUserInfo.userInfo.state = this.user['custom:state'];
        newUserInfo.userInfo.zipcode = this.user['custom:zipcode'];
        this.userInfoService.createUserInfo
        this.userInfoService
          .createUserInfo(newUserInfo)
          .subscribe(() => {
            this.loading = false;
            this.router.navigateByUrl('/signIn?next=profile');
          });
      })
      .catch((e) => {
        this.loading = false;
        this.errorMessage = e.message;
      });
  }

  public goSignIn(): void {
    this.router.navigateByUrl('/signIn?next=profile');
  }

  isFulled() {
    if (!this.user.email) return false;
    if (!this.user.username) return false;
    if (!this.user.password) return false;
    if (!this.user.address) return false;
    if (!this.user['custom:city']) return false;
    if (!this.user['custom:state']) return false;
    if (!this.user['custom:zipcode']) return false;
    if (!this.user.family_name) return false;
    if (!this.user.given_name) return false;

    return true;
  }
}
