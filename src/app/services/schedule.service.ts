import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Course} from '../model/course.model';
import {Occupation} from '../model/occupation.model';
import {Schedule} from '../model/shedule.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


auth = 'Basic ' + btoa('test:test');

httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json', Authorization: this.auth})};

  private url = 'http://test:test@localhost:8080/';
  occu: Occupation;


  constructor(private http: HttpClient) {
  }

  getShedule(): Observable<Schedule[]> {
	const header = {
	headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
 return this.http.get<Schedule[]>(this.url + 'schedule/', header);
  }

  getSheduleById(id: number): Observable<Schedule> {
	const header = {
	headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
 return this.http.get<Schedule>(this.url + 'schedule/' + id, header);
  }

  getOccupations(): Observable<Occupation[]> {
	const header = {
	headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
 return this.http.get<Occupation[]>(this.url + 'occupation/', header);
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

   getCourses(): Observable<Course> {
	  const header = {
		headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
		 return this.http.get<Course>(this.url + 'course/', header);
  }

  getOccupationCounters(): Observable<Course> {
	  const header = {
		headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
		 return this.http.get<Course>(this.url + 'course/', header);
  }
}

