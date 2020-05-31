import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Flow} from '../../model/flow.model';
import {Group} from '../../model/group.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private http: HttpClient) { }

  private url = environment.domain + 'api/';

  getFlowById(id: string): Observable<Flow> {
    return this.http.get<Flow>(this.url + 'flow/' + id);
  }

  getFlowsByDeaneryId(id: string): Observable<Flow[]> {
    return this.http.get<Flow[]>(this.url + 'flow/?deaneryId=' + id);
  }

  deleteFlow(id: string): Observable<Flow> {
    return this.http.delete<Flow>(this.url + 'flow/' + id);
  }

  editGroupSetNullFlow(group: Group): Observable<Group> {
    return this.http.put<Group>(this.url + 'groups/setNullFlow/' + group.id, group).pipe(catchError(this.handleError));
  }

  editFlow(flow: Flow): Observable<Flow> {
    return this.http.put<Flow>(this.url + 'flow/' + flow.id, flow).pipe(catchError(this.handleError));
  }

  addFlow(flow: Flow, id: string): Observable<Flow> {
    return this.http.post<Flow>(this.url + 'flow/?deaneryId=' + id, flow).pipe(catchError(this.handleError));
  }

  checkUniqueFlowName( value: string): Observable<any> {
    return this.http.get<any>(this.url + 'flow/checkUniqFlowName/?name=' + value);
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
