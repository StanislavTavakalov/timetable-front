import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Lectern} from '../../model/lectern.model';

@Injectable({
  providedIn: 'root'
})
export class LecternService {

  constructor(private http: HttpClient) {
  }

  lecternAPIUrl = 'api/lectern/';

  public getLecternById(lecternId: string): Observable<Lectern> {
    return this.http.get<Lectern>(environment.domain + this.lecternAPIUrl + lecternId);
  }

}
