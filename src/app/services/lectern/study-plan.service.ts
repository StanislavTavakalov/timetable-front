import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {StudyPlan} from '../../model/study-plan.model';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudyPlanService {

  constructor(private http: HttpClient) {
  }

  studyPlanAPIUrl = 'api/studyplan/';


  public getStudyPlanById(studyPlanId: string): Observable<StudyPlan> {
    return this.http.get<StudyPlan>(environment.domain + this.studyPlanAPIUrl + studyPlanId)
      .pipe(catchError(this.handleError));
  }

  public getStudyPlans(lecternId: string): Observable<StudyPlan[]> {
    return this.http.get<StudyPlan[]>(environment.domain + this.studyPlanAPIUrl + '?lecternId=' + lecternId)
      .pipe(catchError(this.handleError));
  }

  public createStudyPlan(studyPlan: StudyPlan): Observable<StudyPlan> {
    return this.http.post<StudyPlan>(environment.domain + this.studyPlanAPIUrl, studyPlan)
      .pipe(catchError(this.handleError));
  }

  public editStudyPlan(studyPlan: StudyPlan): Observable<StudyPlan> {
    return this.http.put<StudyPlan>(environment.domain + this.studyPlanAPIUrl + studyPlan.id, studyPlan)
      .pipe(catchError(this.handleError));
  }

  public deleteStudyPlan(studyPlanId: string): Observable<any> {
    return this.http.delete(environment.domain + this.studyPlanAPIUrl + studyPlanId)
      .pipe(catchError(this.handleError));
  }

  // Default error handling implementation
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
