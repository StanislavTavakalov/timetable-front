import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Severity} from '../../model/severity.model';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeverityService {

  constructor(private http: HttpClient) {

  }

  severityAPIUrl = 'api/severity/';

  public getSeverity(severityId: string): Observable<Severity> {
    return this.http.get<Severity>(environment.domain + this.severityAPIUrl + severityId)
      .pipe(catchError(this.handleError));
  }

  public getSeverities(): Observable<Severity[]> {
    return this.http.get<Severity[]>(environment.domain + this.severityAPIUrl)
      .pipe(catchError(this.handleError));
  }

  // Default error handling implementation
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


}
