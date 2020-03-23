import {Injectable} from '@angular/core';
import {HeaderType} from '../model/header-type';
import {BehaviorSubject} from 'rxjs';
import {Lectern} from '../model/lectern.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private USER_TOKEN_KEY = 'currentUserToken';
  private headerType: HeaderType = HeaderType.LECTERN;

  observableHeaderType: BehaviorSubject<HeaderType>;
  observableLectern: BehaviorSubject<Lectern>;

  constructor() {
    this.observableHeaderType = new BehaviorSubject<HeaderType>(this.headerType);
    this.observableLectern = new BehaviorSubject<Lectern>(null);
  }

  public setCurrentUserToken(authToken: string) {
    localStorage.setItem(this.USER_TOKEN_KEY, JSON.stringify(authToken));
  }

  public getCurrentUserToken() {
    return JSON.parse(localStorage.getItem(this.USER_TOKEN_KEY));
  }
}
