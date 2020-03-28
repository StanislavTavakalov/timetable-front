import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Speciality} from '../../model/speciality.model';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http: HttpClient) {
  }

  specialityAPIUrl = 'api/speciality/';

  public getSpecialityById(specialityId: string): Observable<Speciality> {
    return this.http.get<Speciality>(environment.domain + this.specialityAPIUrl + specialityId)
      .pipe(catchError(this.handleError));
  }

  public getSpecialities(lecternId: string): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(environment.domain + this.specialityAPIUrl + '?lecternId=' + lecternId)
      .pipe(catchError(this.handleError));
  }

  public createSpeciality(speciality: Speciality, lecternId: string): Observable<Speciality> {
    return this.http.post<Speciality>(environment.domain + this.specialityAPIUrl + '?lecternId=' + lecternId, speciality)
      .pipe(catchError(this.handleError));
  }

  public editSpeciality(speciality: Speciality): Observable<Speciality> {
    return this.http.put<Speciality>(environment.domain + this.specialityAPIUrl + speciality.id, speciality)
      .pipe(catchError(this.handleError));
  }

  public deleteSpeciality(specialityId: string): Observable<any> {
    return this.http.delete(environment.domain + this.specialityAPIUrl + specialityId)
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
