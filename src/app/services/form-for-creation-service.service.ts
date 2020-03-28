import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FormForCreationServiceService {

httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json'})};

  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  getPlans(): Observable<StudyPlan[]> {
    return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }

  getPlanById(id: string): Observable<StudyPlan> {
    return this.http.get<StudyPlan>(this.url + 'studyplan/' + id);
  }

  editPlan(plan: StudyPlan): Observable<any> {
      return this.http.put(this.url + 'studyplan/' + plan.id, plan, this.httpOptions);
  }

  getPlansByLecternId(id: string): Observable<StudyPlan[]> {
	 return this.http.get<StudyPlan[]>(this.url + 'studyplan/lectern/' + id);
  }

}
