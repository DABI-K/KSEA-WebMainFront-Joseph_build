import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService, IUser } from '../../service/cognito.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['../../css/common-user.scss', './change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  loading: boolean;
  user: IUser;
  oldPassword = '';
  newPassword = '';
  errorMessage: any;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public ngOnInit(): void {
    this.cognitoService
      .getCurrentUset()
      .then((user: any) => {
        this.user = user;
        this.oldPassword = '';
        this.newPassword = '';
        this.errorMessage = null;
      })
      .catch(() => {
        this.router.navigate(['/signIn']);
      });
  }

  public update(): void {
    this.cognitoService
      .changePassword(this.user, this.oldPassword, this.newPassword)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((e) => {
        this.errorMessage = e.message;
      });
  }
}
