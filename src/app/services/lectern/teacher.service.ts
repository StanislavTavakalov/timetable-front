import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Teacher} from '../../model/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {
  }

  private url = environment.domain + 'api/';

  teacherAPIUrl = 'api/teacher/';

  public getTeacher(teacherId: string): Observable<Teacher> {
    return this.http.get<Teacher>(environment.domain + this.teacherAPIUrl + teacherId)
      .pipe(catchError(this.handleError));
  }

  public getTeachers(lecternId: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(environment.domain + this.teacherAPIUrl, {params: {lecternId}})
      .pipe(catchError(this.handleError));
  }

  getTeachersByLecternId(id: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.url + 'teacher/?lecternId=' + id);
  }

  public createTeacher(teacher: Teacher, lecternId: string): Observable<Teacher> {
    return this.http.post<Teacher>(environment.domain + this.teacherAPIUrl, teacher, {params: {lecternId}})
      .pipe(catchError(this.handleError));
  }

  public editTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(environment.domain + this.teacherAPIUrl + teacher.id, teacher)
      .pipe(catchError(this.handleError));
  }

  public deleteTeacher(teacherId: string): Observable<any> {
    return this.http.delete(environment.domain + this.teacherAPIUrl + teacherId)
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
