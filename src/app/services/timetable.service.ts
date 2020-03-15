import {Injectable} from '@angular/core';
import {StudyPlan} from '../model/study-plan.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PLANS} from '../mock/plan-mock';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

auth = 'Basic ' + btoa('test:test');

httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json', Authorization: this.auth})};

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  /*
   getPlans(): Observable<any> {
      this.http.post<StudyPlan>(this.url + 'login', {username: 'test', password: 'test'});
      return this.http.get<Plan[]>(this.url + 'plan/');
  }


  getPlans(): Observable<StudyPlan[]> {
    return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }*/

 getPlans(): Observable<StudyPlan[]> {
	 const header = {
	headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
	 return this.http.get<StudyPlan[]>(this.url + 'studyplan/', header);
   // return of(PLANS);
  }

  editPlan(plan: StudyPlan): Observable<any> {
      return this.http.put(this.url + 'studyplan/' + plan.id, plan, this.httpOptions);
  }
  
  getPlanById(id: number): Observable<StudyPlan> {
	const header = {
	headers: new HttpHeaders()
		.set('Authorization',  'Basic ' + btoa('test:test'))
		};
 return this.http.get<StudyPlan>(this.url + 'studyplan/' + id, header);
  }
  
}
