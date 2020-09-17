import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Employee} from '../../model/employee.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private url = environment.domain + 'api/';

  getEmployeesByDeneryId(id: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + 'employee/?deaneryId=' + id);
  }

  addEmployee(employee: Employee, id: string): Observable<Employee> {
    return this.http.post<Employee>(this.url + 'employee/?deaneryId=' + id, employee).pipe(catchError(this.handleError));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(this.url + 'employee/' + id);
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.url + 'employee/' + employee.id, employee).pipe(catchError(this.handleError));
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
