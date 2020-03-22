import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  private USER_TOKEN_KEY = 'currentUserToken';

  public setCurrentUserToken(authToken: string) {
    localStorage.setItem(this.USER_TOKEN_KEY, JSON.stringify(authToken));
  }

  public getCurrentUserToken() {
    return JSON.parse(localStorage.getItem(this.USER_TOKEN_KEY));
  }

}
