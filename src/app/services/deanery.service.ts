import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Lectern} from '../model/lectern.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Deanery} from '../model/deanery.model';
import {Teacher} from '../model/teacher.model';
import {Employee} from '../model/employee.model';
import {Group} from '../model/group.model';
import {Flow} from '../model/flow.model';


@Injectable({
  providedIn: 'root'
})
export class DeaneryService {

  private url1 = 'http://test:test@localhost:8080/';

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/api/';

  getDeaneryById(id: string): Observable<Deanery> {
    return this.http.get<Deanery>(this.url + 'deanery/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url1 + 'users/');
  }

  getLecterns(id: string): Observable<Lectern[]> {
    return this.http.get<Lectern[]>(this.url + 'lectern/?deaneryId' + id);
  }

  addLectern(lectern: Lectern, idDeanery: string): Observable<Lectern> {
    return this.http.post<Lectern>(this.url + 'lectern/?deaneryId=' + idDeanery, lectern);
  }

  getTeachersByLecternId(id: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + 'teacher/?lecternId=' + id);
 }

  getEmployeesByDeneryId(id: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + 'employee/?deaneryId=' + id);
  }

  addEmployee(employee: Employee, id: string): Observable<Employee> {
    return this.http.post<Employee>(this.url + 'employee/?deaneryId=' + id, employee);
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
    return this.http.put<Lectern>(this.url + 'lectern/' + lectern.id, lectern);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.url + 'employee/' + employee.id, employee);
  }

  getGroupsByFlowId(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups/?deaneryId=' + id);
  }

  getFlowsByLecternId(id: string): Observable<Flow[]> {
    return this.http.get<Flow[]>(this.url + 'flow/?lecternId=' + id);
  }

  deleteFlow(id: string): Observable<Flow> {
    return this.http.delete<Flow>(this.url + 'flow/' + id);
  }

  deleteGroup(id: string): Observable<Group> {
    return this.http.delete<Group>(this.url + 'groups/' + id);
  }

  editGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(this.url + 'groups/' + group.id, group);
  }

  editFlow(flow: Flow): Observable<Flow> {
    return this.http.put<Flow>(this.url + 'flow/' + flow.id, flow);
  }

  addFlow(flow: Flow, id: string): Observable<Flow> {
    return this.http.post<Flow>(this.url + 'flow/?lecternId=' + id, flow);
  }

  addGroup(group: Group, id: string): Observable<Group> {
    return this.http.post<Group>(this.url + 'groups/?flowId=' + id, group);
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
}
