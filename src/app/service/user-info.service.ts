import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../shared/userinfo';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  apiURL = environment.apiURLs.user_info_api_URL;

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch user-info list
  getAllUserInfos(token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(this.apiURL + '/user-infos', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllUserInfosFromKey(token: string, key: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(this.apiURL + '/user-infos/' + key, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch user-info
  getUserInfo(id: any, token: string): Observable<UserInfo> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<UserInfo>(this.apiURL + '/user-info/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUserInfoByEmail(email: any, token: string): Observable<UserInfo> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<UserInfo>(
        this.apiURL + '/user-infobyemail/' + email,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create user-info
  createUserInfo(userInfo: UserInfo): Observable<UserInfo> {
    return this.http
      .put<UserInfo>(
        this.apiURL + '/user-info',
        JSON.stringify(userInfo),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  batchUserInfos(data: any): Observable<any> {
    return this.http.put<any>(
      this.apiURL + '/user-infos',
      JSON.stringify(data),
      this.httpOptions
    );
  }

  // HttpClient API delete() method => Delete user-info
  deleteUserInfo(id: any, token: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .delete<UserInfo>(this.apiURL + '/user-info/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}
