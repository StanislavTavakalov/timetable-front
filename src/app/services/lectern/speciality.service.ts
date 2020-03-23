import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Speciality} from '../../model/speciality.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http: HttpClient) {
  }

  specialityAPIUrl = 'api/speciality/';

  public getSpecialityById(specialityId: string): Observable<Speciality> {
    return this.http.get<Speciality>(environment.domain + this.specialityAPIUrl + specialityId);
  }

}
