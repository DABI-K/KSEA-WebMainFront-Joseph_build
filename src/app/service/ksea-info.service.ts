import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KseaInfoService {
  apiURL = environment.apiURLs.ksea_info_api_URL;
  kseaInfoId = environment.webConfig.kseaInfoId;
  kseaInfo: any;

  constructor(private http: HttpClient) {}

  // HttpClient API get() method => Fetch ksea-info
  getKSEAInfo(): Observable<any> {
    if (this.kseaInfo)
      return new Observable((observer) => {
        // observable execution
        observer.next(this.kseaInfo);
        observer.complete();
      });

    return this.http
      .get<any>(this.apiURL + '/ksea-info/' + this.kseaInfoId)
      .pipe(retry(1), catchError(this.handleError));
  }

  setKSEAInfo(info: any) {
    this.kseaInfo = info;
  }

  getEventDef(id: string): Observable<any> {
    return this.http
      .get<any>(this.apiURL + '/ksea-events-def/' + id)
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
