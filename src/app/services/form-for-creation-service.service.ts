import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StudyPlan} from '../model/study-plan.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FormForCreationServiceService {
  private url = environment.domain + 'api/';

  constructor(private http: HttpClient) {
  }

  getPlans(): Observable<StudyPlan[]> {
    return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }

  getPlanById(id: string): Observable<StudyPlan> {
    return this.http.get<StudyPlan>(this.url + 'studyplan/' + id);
  }
  getPlansByLecternId(id: string): Observable<StudyPlan[]> {
    return this.http.get<StudyPlan[]>(this.url + 'studyplan/?lecternId=' + id);
  }

}
