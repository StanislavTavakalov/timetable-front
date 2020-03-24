import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {Lectern} from '../model/lectern.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Deanery} from '../model/deanery.model';


@Injectable({
  providedIn: 'root'
})
export class DeaneryService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/api/';
  private url1 = 'http://localhost:8080/';

  getDeaneryById(id: string): Observable<Deanery> {
    return this.http.get<Deanery>(this.url1 + 'deanery/' + id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url1 + 'users/');
  }

  getLecterns(id: string): Observable<Lectern[]> {
    return this.http.get<Lectern[]>(this.url + 'lectern/deanery/' + id);
  }

}
