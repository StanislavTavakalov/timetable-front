import { Injectable } from '@angular/core';
import {LECTERNS} from '../mock/lectern-mock';
import {USERS} from '../mock/lectern-mock';
import {User} from '../model/user.model';
import {Lectern} from '../model/lectern.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DeaneryService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/';

  getUsers(): Observable<User[]> {
	  return of(USERS);
  }

  getLecterns(): Observable<Lectern[]> {
	  return of(LECTERNS);
  }

}
