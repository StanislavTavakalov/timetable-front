import {Injectable} from '@angular/core';
import {HeaderType} from '../model/header-type';
import {BehaviorSubject} from 'rxjs';
import {Lectern} from '../model/lectern.model';
import {Deanery} from '../model/deanery.model';
import {User} from '../model/user.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private USER_TOKEN_KEY = 'currentUserToken';
  private CURRENT_USER = 'currentUser';
  private headerType: HeaderType = HeaderType.LECTERN;
  private SECRET_KEY = 'superSecretKeyBNTU';

  observableHeaderType: BehaviorSubject<HeaderType>;
  observableLectern: BehaviorSubject<Lectern>;
  observableDeanery: BehaviorSubject<Deanery>;
  observableCurrentUser: BehaviorSubject<User>;

  constructor() {
    this.observableHeaderType = new BehaviorSubject<HeaderType>(this.headerType);
    this.observableLectern = new BehaviorSubject<Lectern>(null);
    this.observableDeanery = new BehaviorSubject<Deanery>(null);
    this.observableCurrentUser = new BehaviorSubject<User>(null);
  }

  public setCurrentUserToken(authToken: string) {
    localStorage.setItem(this.USER_TOKEN_KEY, CryptoJS.AES.encrypt(JSON.stringify(authToken), this.SECRET_KEY.trim()).toString());
  }

  public getCurrentUserToken() {
    if (!localStorage.getItem(this.USER_TOKEN_KEY)) {
      return;
    }
    return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(this.USER_TOKEN_KEY), this.SECRET_KEY.trim()).toString(CryptoJS.enc.Utf8));
  }

  public setCurrentUser(user: User) {
    this.observableCurrentUser.next(user);
    localStorage.setItem(this.CURRENT_USER, CryptoJS.AES.encrypt(JSON.stringify(user), this.SECRET_KEY.trim()).toString());
  }

  public getCurrentUser(): User {
    if (!localStorage.getItem(this.CURRENT_USER)) {
      return;
    }
    return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(this.CURRENT_USER), this.SECRET_KEY.trim()).toString(CryptoJS.enc.Utf8));
  }

  public changeHeaderType(headerType: HeaderType) {
    this.observableHeaderType.next(headerType);
  }
}
