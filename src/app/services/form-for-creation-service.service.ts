import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Observable, of} from 'rxjs';
import {PLANS} from '../mock/plan-mock';


@Injectable({
  providedIn: 'root'
})
export class FormForCreationServiceService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  /*addPlan(plan: StudyPlan): Observable<StudyPlan> {
      return this.http.post<StudyPlan>(this.disciplinesUrl, plan);
      return this.http.post<StudyPlan>(this.disciplinesUrl, {username:"test", password:"test"});
    }
    editPlan(plan; StudyPlan): Observable<any> {
      return this.http.put(this.disciplinesUrl, plan, this.httpOptions);
  }
    getPlans(): Observable <StudyPlan[]> {
      return.this.http.get<StudyPlan[]>(this.disciplinesUrl);
    }
    getPlanById(id: number): Observable<StudyPlan> {
    const url = `${this.disciplinesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }



  addPlan(plan: StudyPlan): Observable<number> {
    return of(PLANS.push(plan));
  }*/

  getPlans(): Observable<StudyPlan[]> {
     return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }

  getPlanById(id: number): Observable<StudyPlan> {
     return this.http.get<StudyPlan>(this.url + 'studyplan/' + id);
  }

  editPlan(plan: StudyPlan): Observable<any> {
      return this.http.put(this.url + 'studyplan/' + plan.id, plan, this.httpOptions);
  }

}
