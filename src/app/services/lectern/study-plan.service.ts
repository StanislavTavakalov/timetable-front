import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StudyPlan} from '../../model/study-plan.model';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private http: HttpClient) {
  }

  // TODO: WA solution, need to be removed
  public getAuthToken() {
    return this.http.post(environment.domain + 'api/auth/signin', {username: 'root', password: 'password'});
  }

  public getAllStudyPlans() {
    return this.http.get(environment.domain + 'api/studyplan/studyplan-list');
  }

  public updateStudyPlan(studyPlan: StudyPlan) {
    return this.http.put(environment.domain + 'api/studyplan/' + studyPlan.id, studyPlan);
  }


}
