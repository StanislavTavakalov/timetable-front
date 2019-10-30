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

  private disciplinesUrl = 'api/timetable';

  constructor(private http: HttpClient) {
  }

  getPlans(): Observable<StudyPlan[]> {
    return of(PLANS);
  }
}
