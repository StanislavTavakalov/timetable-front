import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Lectern} from '../model/lectern.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Deanery} from '../model/deanery.model';
import {Teacher} from '../model/teacher.model';
import {Employee} from '../model/employee.model';


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
    return this.http.get<Lectern[]>(this.url + 'lectern/?deanery_id' + id);
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

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.url + 'employee/' + id);
  }

  editLectern(lectern: Lectern): Observable<Lectern> {
    return this.http.put<Lectern>(this.url + 'lectern/' + lectern.id, lectern);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.url + 'employee/' + employee.id, employee);
  }
}
