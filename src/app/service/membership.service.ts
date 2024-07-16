import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Membership } from '../shared/membership';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  apiURL = environment.apiURLs.membership_api_URL;

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch memberships list
  getAllMemberships(token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(this.apiURL + '/memberships', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllMembershipsFromKey(token: string, key: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(this.apiURL + '/memberships/' + key, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch membership
  getMembership(id: any, token: string): Observable<Membership> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<Membership>(this.apiURL + '/membership/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getMembershipByEmail(email: any, token: string): Observable<Membership> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<Membership>(
        this.apiURL + '/membershipbyemail/' + email,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create membership
  createMembership(
    membership: Membership,
    token: string
  ): Observable<Membership> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .put<Membership>(
        this.apiURL + '/membership',
        JSON.stringify(membership),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  batchMemberships(data: any): Observable<any> {
    return this.http.put<any>(
      this.apiURL + '/memberships',
      JSON.stringify(data),
      this.httpOptions
    );
  }

  // HttpClient API delete() method => Delete membership
  deleteMembership(id: any, token: string) {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .delete<Membership>(this.apiURL + '/membership/' + id, this.httpOptions)
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
