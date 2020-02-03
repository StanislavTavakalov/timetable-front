import {Injectable} from '@angular/core';
import {StudyPlan} from '../model/study-plan.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PLANS} from '../mock/plan-mock';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  addPlan(plan: StudyPlan): Observable<StudyPlan> {
    return this.http.post<StudyPlan>(this.url + 'studyplan', plan, this.httpOptions);
  }


  /*getPlans(): Observable <StudyPlan[]> {
    return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }*/


  getPlans(): Observable<StudyPlan[]> {
    console.log('12');
    return of(PLANS);
  }

  getPlanById(id: number): Observable<StudyPlan> {
    return of(PLANS.find((plan) => {
      return plan.id === id;
    }));
  }
}
