import {Injectable} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {LecternService} from './lectern.service';
import {NotifierService} from 'angular-notifier';
import {HeaderType} from '../../model/header-type';
import {Router} from '@angular/router';
import {AuthService} from '../util/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LecternUtilityService {

  constructor(private localStorageService: LocalStorageService,
              private lecternService: LecternService,
              private authService: AuthService,
              private notifierService: NotifierService,
              private router: Router) {
  }


  public loadLecternToLocalStorageIfNeeded(lecternId: string) {
    // Setting Header to Lectern Type
    this.localStorageService.changeHeaderType(HeaderType.LECTERN);

    // loading of Lectern if it is null or id changed
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== lecternId) {
      this.lecternService.getLecternById(lecternId).subscribe(lectern => {
        this.localStorageService.observableLectern.next(lectern);
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить кафедру.');
      });
    }
  }

  public checkToken(token: string, lecternId) {
    if (token) {
      this.localStorageService.setCurrentUserToken('Bearer ' + token);
      this.router.navigate([`lectern/${lecternId}`]);
    }
  }

  public loadCurrentUserIfNeeded() {
    if (this.localStorageService.getCurrentUser()) {
      return;
    }
    this.authService.getCurrentUser().subscribe(user => this.localStorageService.setCurrentUser(user), error => {
      this.notifierService.notify('error', 'Ошибка при загрузке текущего пользователя');
    });
  }

}
