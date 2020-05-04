import { Injectable } from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {Course} from '../model/course.model';
import {Occupation} from '../model/occupation.model';
import {Schedule} from '../model/shedule.model';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Employee} from '../model/employee.model';
import {Lectern} from '../model/lectern.model';
import {catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private url = environment.domain + 'api/';

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
    return this.http.put<Schedule>(this.url + 'schedule/' + schedule.id, schedule).pipe(catchError(this.handleError));
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

