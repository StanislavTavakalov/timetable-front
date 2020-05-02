import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Course} from '../model/course.model';
import {Occupation} from '../model/occupation.model';
import {Schedule} from '../model/shedule.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Employee} from '../model/employee.model';
import {Lectern} from '../model/lectern.model';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private url = 'http://test:test@localhost:8080/api/';

  occu: Occupation;


  constructor(private http: HttpClient) {
  }

  getShedule(id: string): Observable<Schedule[]> {
  return this.http.get<Schedule[]>(this.url + 'schedule/?studyplanId=' + id);
  }

  getSheduleById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(this.url + 'schedule/' + id);
  }

  getOccupations(): Observable<Occupation[]> {
    return this.http.get<Occupation[]>(this.url + 'occupation/');
  }
  getOccupationById(id: string): Observable<Occupation> {
    return this.http.get<Occupation>(this.url + 'occupation/' + id);
  }

  addSchedule(schedule: Schedule, id: string): Observable<Schedule> {
    return this.http.post<Schedule>(this.url + 'schedule/?studyplanId=' + id, schedule);
  }

  public getAuthToken() {
    return this.http.post(environment.domain + 'api/auth/signin', {username: 'test', password: 'test'});
  }

  addOccupation(occupation: Occupation): Observable<Occupation> {
    return this.http.post<Occupation>(this.url + 'occupation/', occupation);
  }

  saveSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.url + 'schedule/' + schedule.id, schedule);
  }

  deleteCourse(id: string): Observable<Course> {
    return this.http.delete<Course>(this.url + 'course/' + id);
  }

  deleteSchedule(id: string): Observable<Lectern> {
    return this.http.delete<Lectern>(this.url + 'schedule/' + id);
  }
  checkUniqueOccupation(param: string, value: string): Observable<any> {
    return this.http.get<any>(this.url + 'occupation/checkUniqOccupation/?' + param + '=' + value);
  }
}

