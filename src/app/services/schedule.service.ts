import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Course} from '../model/course.model';
import {COURSES, SCHEDULE} from '../mock/course-mock';
import {Occupation} from '../model/occupation.model';
import {OCCUPATIONS} from '../mock/occupation-mock';
import {PLANS} from '../mock/plan-mock';
import {StudyPlan} from '../model/study-plan.model';
import {Schedule} from '../model/shedule.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {



httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json'})};

  private url = 'http://localhost:8080/';
  occu: Occupation;


  constructor(private http: HttpClient) {
  }

  getShedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.url + 'schedule/');
  }

  getOccupations(): Observable<Occupation[]> {
     return this.http.get<Occupation[]>(this.url + 'occupation/');
  }

  addOccupation(occupation: Occupation): Observable<Occupation> {
  	return this.http.post<Occupation>(this.url + 'occupation/', occupation, this.httpOptions);
  }

  getOccupationBySymbol(symbol): Observable<Occupation> {
    const subject = new Subject<Occupation>();
    this.getOccupations().subscribe(occupations => {
     	this.occu = occupations.find((occupation) => {
      	     return occupation.symbol === symbol;
    	});
	     subject.next(this.occu);
    });

    return subject.asObservable();

  }


  saveSchedule(schedule: Schedule): Observable<Schedule> {
	return this.http.put<Schedule>(this.url + 'schedule/' + schedule.id, schedule, this.httpOptions);
   }


}

