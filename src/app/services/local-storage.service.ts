import {Injectable} from '@angular/core';
import {HeaderType} from '../model/header-type';
import {BehaviorSubject} from 'rxjs';
import {Lectern} from '../model/lectern.model';
import {Deanery} from '../model/deanery.model';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private USER_TOKEN_KEY = 'currentUserToken';
  private CURRENT_USER = 'currentUser';
  private headerType: HeaderType = HeaderType.LECTERN;

  observableHeaderType: BehaviorSubject<HeaderType>;
  observableLectern: BehaviorSubject<Lectern>;
  observableDeanery: BehaviorSubject<Deanery>;

  constructor() {
    this.observableHeaderType = new BehaviorSubject<HeaderType>(this.headerType);
    this.observableLectern = new BehaviorSubject<Lectern>(null);
    this.observableDeanery = new BehaviorSubject<Deanery>(null);
  }

  public setCurrentUserToken(authToken: string) {
    localStorage.setItem(this.USER_TOKEN_KEY, JSON.stringify(authToken));
  }

  public getCurrentUserToken() {
    return JSON.parse(localStorage.getItem(this.USER_TOKEN_KEY));
  }

  public setCurrentUser(user: User) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER));
  }

  public changeHeaderType(headerType: HeaderType) {
    this.observableHeaderType.next(headerType);
  }
}
