import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/internal/operators';
import {Subject} from '../model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {

  }

  public getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + 'simplemvcapp-entity-gen/syllabus/');
  }

}
