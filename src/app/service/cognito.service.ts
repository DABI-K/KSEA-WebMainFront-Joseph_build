import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

import { environment } from '../../environments/environment';

export interface IUser {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
  address: string;
  birthdate: Date;
  family_name: string;
  gender: string;
  given_name: string;
  middle_name: string;
  phone_number: string;
  website: string;
  consent: boolean;
  'custom:city': string;
  'custom:state': string;
  'custom:zipcode': string;
  'custom:title': string;
  'custom:ukc': string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.given_name,
        family_name: user.family_name,
        address: user.address,
        'custom:city': user['custom:city'],
        'custom:state': user['custom:state'],
        'custom:zipcode': user['custom:zipcode'],
      },
    });
  }

  public getToken(): Promise<any> {
    return Auth.currentSession();
  }

  public resetPassword(username: string): Promise<any> {
    return Auth.forgotPassword(username);
  }

  public resetPasswordSubmit(
    username: string,
    code: string,
    password: string
  ): Promise<any> {
    return Auth.forgotPasswordSubmit(username, code, password);
  }

  public confirmSignUp(user: IUser): Promise<any> {
    Auth.forgotPassword;
    return Auth.confirmSignUp(user.username, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password).then(() => {
      this.authenticationSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut().then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public getCurrentUset(): Promise<any> {
    return Auth.currentAuthenticatedUser();
  }

  public updateUser(user: IUser): Promise<any> {
    let updatedUser: any = {};
    if (user.address) updatedUser.address = user.address;
    if (user.birthdate) updatedUser.birthdate = user.birthdate;
    if (user['custom:city']) updatedUser['custom:city'] = user['custom:city'];
    if (user['custom:state'])
      updatedUser['custom:state'] = user['custom:state'];
    if (user['custom:title'])
      updatedUser['custom:title'] = user['custom:title'];
    if (user['custom:zipcode'])
      updatedUser['custom:zipcode'] = user['custom:zipcode'];
    if (user.family_name) updatedUser.family_name = user.family_name;
    if (user.gender) updatedUser.gender = user.gender;
    if (user.given_name) updatedUser.given_name = user.given_name;
    if (user.middle_name) updatedUser.middle_name = user.middle_name;
    if (user.phone_number) updatedUser.phone_number = user.phone_number;
    if (user.website) updatedUser.website = user.website;
    return Auth.currentUserPoolUser().then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, updatedUser);
    });
  }

  public changePassword(
    user: IUser,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    return Auth.changePassword(user, oldPassword, newPassword);
  }
}
