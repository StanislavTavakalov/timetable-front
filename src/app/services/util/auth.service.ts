import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getAuthToken() {
    return this.http.post(environment.domain + 'api/auth/signin', {username: 'root', password: 'password'});
  }

}
