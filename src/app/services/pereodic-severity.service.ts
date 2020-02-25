import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Severity} from '../model/severity.model';
import {PEREODIC_SEVERITY_LIST} from '../mock/pereodic-severities-mock';


@Injectable({
  providedIn: 'root'
})
export class PereodicSeverityService {

  private url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {

  }

  // TODO: reimplement mock
  public getPereodicSeverities(): Observable<Severity[]> {
    return of(PEREODIC_SEVERITY_LIST);
  }

  // TODO: reimplement mock
  public getPereodicSeveritiesNotObs(): Severity[] {
    return PEREODIC_SEVERITY_LIST;
  }
}
