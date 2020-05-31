import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Group} from '../../model/group.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  private url = environment.domain + 'api/';

  getFreeGroupsByDeaneryId(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups/freeGroups/?deaneryId=' + id);
  }

  getGroupsByDeaneryId(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups/?deaneryId=' + id);
  }

  getGroupsByLecternId(lecternId: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups/', {params: {lecternId}});
  }

  editGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.url + 'groups/' + group.id, group).pipe(catchError(this.handleError));
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.url + 'groups/', group).pipe(catchError(this.handleError));
  }

  deleteGroup(id: string): Observable<Group> {
    return this.http.delete<Group>(this.url + 'groups/' + id);
  }

  checkUniqueGroupName(value: string): Observable<any> {
    return this.http.get<any>(this.url + 'groups/checkUniqGroupName/?name=' + value);
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
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message);
  }
}
