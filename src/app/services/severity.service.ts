import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Severity} from '../model/severity.model';
import {SEVERITY_LIST} from '../mock/severity-mock';

@Injectable({
  providedIn: 'root'
})
export class SeverityService {
  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {

  }

  public getSeverities(): Observable<Severity[]> {
    // return this.http.get<Subject[]>(this.url + 'simplemvcapp-entity-gen/syllabus/');
    return of(SEVERITY_LIST);
  }

  public getSeveritiesNotObs(): Severity[] {
    // return this.http.get<Subject[]>(this.url + 'simplemvcapp-entity-gen/syllabus/');
    return SEVERITY_LIST;
  }
}
