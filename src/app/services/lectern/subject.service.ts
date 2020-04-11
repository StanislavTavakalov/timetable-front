import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Subject} from '../../model/subject.model';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {

  }

  subjectAPIUrl = 'api/subject/';

  public getSubject(subjectId: string): Observable<Subject> {
    return this.http.get<Subject>(environment.domain + this.subjectAPIUrl + subjectId)
      .pipe(catchError(this.handleError));
  }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(environment.domain + this.subjectAPIUrl)
      .pipe(catchError(this.handleError));
  }

  public getSubjectsTemplates(lecternId: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(environment.domain + this.subjectAPIUrl + '?lecternId=' + lecternId)
      .pipe(catchError(this.handleError));
  }

  public createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(environment.domain + this.subjectAPIUrl, subject)
      .pipe(catchError(this.handleError));
  }

  public editSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(environment.domain + this.subjectAPIUrl + subject.id, subject)
      .pipe(catchError(this.handleError));
  }

  public deleteSubject(subjectId: string): Observable<any> {
    return this.http.delete(environment.domain + this.subjectAPIUrl + subjectId)
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
