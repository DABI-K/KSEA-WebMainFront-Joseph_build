import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../service/cognito.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../../css/common-user.scss', './reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean;
  username = '';
  newPassword = '';
  errorMessage: any;
  isConfirm: boolean;
  code = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
  }

  public ngOnInit(): void {
    this.loading = false;
    this.username = '';
    this.newPassword = '';
    this.code = '';
    this.errorMessage = null;
  }

  public update(): void {
    this.cognitoService
      .resetPassword(this.username)
      .then(() => {
        this.isConfirm = true;
      })
      .catch((e) => {
        this.errorMessage = e.message;
        this.isConfirm = false;
      });
  }

  public confirmReset(): void {
    this.loading = true;
    this.cognitoService
      .resetPasswordSubmit(this.username, this.code, this.newPassword)
      .then(() => {
        this.router.navigate(['/signIn']);
      })
      .catch((e) => {
        this.loading = false;
        this.errorMessage = e.message;
      });
  }
}
