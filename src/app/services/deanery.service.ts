import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Lectern} from '../model/lectern.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Deanery} from '../model/deanery.model';
import {Teacher} from '../model/teacher.model';


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
    return this.http.get<Lectern[]>(this.url + 'lectern/deanery/' + id);
  }

  addLectern(lectern: Lectern, idDeanery: string): Observable<Lectern> {
    return this.http.post<Lectern>(this.url + 'lectern/' + idDeanery, lectern);
  }

  getTeachersByLecternId(id: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + 'teacher/?lecternId=' + id);
 }
}
