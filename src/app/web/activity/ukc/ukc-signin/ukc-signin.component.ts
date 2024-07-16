import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser, CognitoService } from '../../../../service/cognito.service';

@Component({
  selector: 'app-ukc-signin',
  templateUrl: './ukc-signin.component.html',
  styleUrls: [
    '../../../../css/common-user.scss',
    './ukc-signin.component.scss',
  ],
})
export class UkcSigninComponent {
  loading: boolean;
  user: IUser;
  errorMessage: any;
  next: any;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private aroute: ActivatedRoute
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.errorMessage = null;

    this.next = undefined;
    this.aroute.queryParams.subscribe((params) => {
      this.next = params['next'];
      console.log('NEXT: ' + this.next);
    });
  }

  public ngOnInit(): void {
    this.loading = false;
    this.user = {} as IUser;
    this.errorMessage = null;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        if (this.next) {
          this.router.navigate(['/' + this.next]);
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch((e) => {
        this.loading = false;
        this.errorMessage = e.message;
      });
  }

  public resetPassword(): void {
    this.router.navigate(['/resetPassword']);
  }

  signUp() {
    if (this.next) {
      this.router.navigateByUrl('/ukc-signUp?next=' + this.next);
    } else {
      this.router.navigateByUrl('/ukc-signUp');
    }
  }
}
