import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Lectern} from '../../model/lectern.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LecternService {

  constructor(private http: HttpClient) {
  }

  private url = environment.domain + 'api/';

  lecternAPIUrl = 'api/lectern/';

  public getLecternById(lecternId: string): Observable<Lectern> {
    return this.http.get<Lectern>(environment.domain + this.lecternAPIUrl + lecternId).pipe(catchError(this.handleError));
  }

  deleteLectern(id: string): Observable<Lectern> {
    return this.http.delete<Lectern>(this.url + 'lectern/' + id);
  }


  editLectern(lectern: Lectern): Observable<Lectern> {
    return this.http.put<Lectern>(this.url + 'lectern/' + lectern.id, lectern).pipe(catchError(this.handleError));
  }

  checkUniqueLectern(param: string, value: string): Observable<any> {
    return this.http.get<any>(this.url + 'lectern/checkUniqLectern/?' + param + '=' + value);
  }

  getLecterns(id: string): Observable<Lectern[]> {
    return this.http.get<Lectern[]>(this.url + 'lectern/?deaneryId' + id);
  }

  getLecternByGroupId(id: string): Observable<Lectern> {
    return this.http.get<Lectern>(this.url + 'lectern/getLecternByGroupId/?groupsId=' + id);
  }

  addLectern(lectern: Lectern, idDeanery: string): Observable<Lectern> {
    return this.http.post<Lectern>(this.url + 'lectern/?deaneryId=' + idDeanery, lectern).pipe(catchError(this.handleError));
  }

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
