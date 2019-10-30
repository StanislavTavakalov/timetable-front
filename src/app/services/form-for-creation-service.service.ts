import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudyPlan } from '../model/study-plan.model';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FormForCreationServiceService {

  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

private disciplinesUrl = 'api/timetable';

  constructor(private http: HttpClient) { }

  addPlan(plan: StudyPlan): Observable<void> {
  return this.http.post<void>(this.disciplinesUrl, plan, this.httpOptions);
}

}
