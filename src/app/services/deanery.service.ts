import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Lectern} from '../model/lectern.model';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Deanery} from '../model/deanery.model';
import {Teacher} from '../model/teacher.model';
import {Employee} from '../model/employee.model';
import {Group} from '../model/group.model';
import {Flow} from '../model/flow.model';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeaneryService {
  constructor(private http: HttpClient) { }

  private url = environment.domain + 'api/';

  getDeaneryById(id: string): Observable<Deanery> {
    return this.http.get<Deanery>(this.url + 'deanery/' + id);
  }
  getLecterns(id: string): Observable<Lectern[]> {
    return this.http.get<Lectern[]>(this.url + 'lectern/?deaneryId' + id);
  }

  addLectern(lectern: Lectern, idDeanery: string): Observable<Lectern> {
    return this.http.post<Lectern>(this.url + 'lectern/?deaneryId=' + idDeanery, lectern).pipe(catchError(this.handleError));
  }

  getTeachersByLecternId(id: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + 'teacher/?lecternId=' + id);
 }

  getEmployeesByDeneryId(id: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + 'employee/?deaneryId=' + id);
  }

  addEmployee(employee: Employee, id: string): Observable<Employee> {
    return this.http.post<Employee>(this.url + 'employee/?deaneryId=' + id, employee).pipe(catchError(this.handleError));
  }

  deleteLectern(id: string): Observable<Lectern> {
    return this.http.delete<Lectern>(this.url + 'lectern/' + id);
  }
  getFlowById(id: string): Observable<Flow> {
    return this.http.get<Flow>(this.url + 'flow/' + id);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.url + 'employee/' + id);
  }

  editLectern(lectern: Lectern): Observable<Lectern> {
    return this.http.put<Lectern>(this.url + 'lectern/' + lectern.id, lectern).pipe(catchError(this.handleError));
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.url + 'employee/' + employee.id, employee).pipe(catchError(this.handleError));
  }

  getFreeGroupsByDeaneryId(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups/freeGroups/?deaneryId=' + id);
  }

  getGroupsByDeaneryId(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups/?deaneryId=' + id);
  }

  getFlowsByDeaneryId(id: string): Observable<Flow[]> {
    return this.http.get<Flow[]>(this.url + 'flow/?deaneryId=' + id);
  }

  deleteFlow(id: string): Observable<Flow> {
    return this.http.delete<Flow>(this.url + 'flow/' + id);
  }

  deleteGroup(id: string): Observable<Group> {
    return this.http.delete<Group>(this.url + 'groups/' + id);
  }

  editGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.url + 'groups/' + group.id, group).pipe(catchError(this.handleError));
  }

  editGroupSetNullFlow(group: Group): Observable<Group> {
    return this.http.put<Group>(this.url + 'groups/setNullFlow/' + group.id, group).pipe(catchError(this.handleError));
  }

  editFlow(flow: Flow): Observable<Flow> {
    return this.http.put<Flow>(this.url + 'flow/' + flow.id, flow).pipe(catchError(this.handleError));
  }

  addFlow(flow: Flow): Observable<Flow> {
    return this.http.post<Flow>(this.url + 'flow/', flow).pipe(catchError(this.handleError));
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.url + 'groups/', group).pipe(catchError(this.handleError));
  }

  checkUniqueLectern(param: string, value: string): Observable<any> {
    return this.http.get<any>(this.url + 'lectern/checkUniqLectern/?' + param + '=' + value);
  }

  checkUniqueGroupName( value: string): Observable<any> {
    return this.http.get<any>(this.url + 'groups/checkUniqGroupName/?name=' + value);
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
