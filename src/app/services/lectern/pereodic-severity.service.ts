import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {PereodicSeverity} from '../../model/pereodic-severity.model';


@Injectable({
  providedIn: 'root'
})
export class PereodicSeverityService {

  pereodicSeverityAPIUrl = 'api/pereodicseverity/';

  constructor(private http: HttpClient) {

  }

  public getPereodicSeverity(pereodicSeverityId: string): Observable<PereodicSeverity> {
    return this.http.get<PereodicSeverity>(environment.domain + this.pereodicSeverityAPIUrl + pereodicSeverityId)
      .pipe(catchError(this.handleError));
  }

  public getPereodicSeverities(): Observable<PereodicSeverity[]> {
    return this.http.get<PereodicSeverity[]>(environment.domain + this.pereodicSeverityAPIUrl)
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
