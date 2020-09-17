import {Injectable} from '@angular/core';
import {StudyPlan} from '../model/study-plan.model';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Speciality} from '../model/speciality.model';
import {Lectern} from '../model/lectern.model';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private url = environment.domain + 'api/';

  constructor(private http: HttpClient) {
  }

 getPlans(): Observable<StudyPlan[]> {
      return this.http.get<StudyPlan[]>(this.url + 'studyplan/');
  }

  getPlansByLecternId(id: string): Observable<StudyPlan[]> {
      return this.http.get<StudyPlan[]>(this.url + 'studyplan/?lecternId=' + id);
  }

  editPlan(plan: StudyPlan): Observable<any> {
      return this.http.put(this.url + 'studyplan/' + plan.id, plan).pipe(catchError(this.handleError));
  }

  getPlanById(id: string): Observable<StudyPlan> {
    return this.http.get<StudyPlan>(this.url + 'studyplan/' + id);
  }

  getLecternById(id: string): Observable<Lectern> {
    return this.http.get<Lectern>(this.url + 'lectern/' + id);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.error.message);
  }
}
