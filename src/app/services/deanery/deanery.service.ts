import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Deanery} from '../../model/deanery.model';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeaneryService {
  constructor(private http: HttpClient) { }

  private url = environment.domain + 'api/';

  getDeaneryById(id: string): Observable<Deanery> {
    return this.http.get<Deanery>(this.url + 'deanery/' + id);
  }

}
