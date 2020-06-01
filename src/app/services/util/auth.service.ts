import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {StudyPlan} from '../../model/study-plan.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getAuthToken() {
    return this.http.post(environment.domain + 'api/auth/signin', {username: 'root', password: 'password'});
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(environment.domain + 'users/me/');
  }
}
