import {Injectable} from '@angular/core';
import {StudyPlan} from '../model/study-plan.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Speciality} from '../model/speciality.model';
import {Lectern} from '../model/lectern.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {


httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json'})};

  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

 getPlans(): Observable<StudyPlan[]> {
      return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }

  getPlansByLecternId(id: string): Observable<StudyPlan[]> {
      return this.http.get<StudyPlan[]>(this.url + 'studyplan/?lecternId=' + id);
  }

  editPlan(plan: StudyPlan): Observable<any> {
      return this.http.put(this.url + 'studyplan/' + plan.id, plan, this.httpOptions);
  }

  getPlanById(id: string): Observable<StudyPlan> {
    return this.http.get<StudyPlan>(this.url + 'studyplan/' + id);
  }
  getLecternById(id: string): Observable<Lectern> {
    return this.http.get<Lectern>(this.url + 'lectern/' + id);
}
}
