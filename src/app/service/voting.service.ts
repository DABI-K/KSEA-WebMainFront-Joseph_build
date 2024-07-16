import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class VotingService {
  apiURL = environment.apiURLs.voting_api_URL;

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch membership
  getMembership(id: any): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/ksea-voting/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  checkFirstVote(username: any, token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(
        this.apiURL + '/ksea-voting/result/' + username,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  putVotingDef(votingDef: any): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    return this.http
      .put<any>(
        this.apiURL + '/ksea-voting',
        JSON.stringify(votingDef),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  putVotingResult(result: any, token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .put<any>(
        this.apiURL + '/ksea-voting/result',
        JSON.stringify(result),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllVotingResults(token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(this.apiURL + '/ksea-voting/result', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getNextVotingResults(token: string, key: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.delete('Authorization');
    this.httpOptions.headers = this.httpOptions.headers.append(
      'Authorization',
      token
    );
    return this.http
      .get<any>(
        this.apiURL + '/ksea-voting/result/next/' + key,
        this.httpOptions
      )
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
