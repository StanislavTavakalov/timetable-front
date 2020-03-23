import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {of, Subscription} from 'rxjs';
import {HeaderType} from '../../model/header-type';
import {Lectern} from '../../model/lectern.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  // TODO: NIKITA RENAME AND CONFIGURE FOR DEANERY
  navLinks = [{
    path: '/study-plans',
    label: 'Учебный план',
    isActive: true
  }, {
    path: '/timetable',
    label: 'Расписание занятий',
    isActive: true
  }];

  lecternNavLinks = [{
    path: '/specialities',
    label: 'Специальности',
    isActive: true
  }, {
    path: '/study-plans',
    label: 'Учебные планы',
    isActive: true
  }, {
    path: '/subjects',
    label: 'Учебные предметы',
    isActive: true
  }, {
    path: '/teachers',
    label: 'Преподаватели',
    isActive: true
  },
  ];

  tabsType: HeaderType;
  lectern: Lectern;
  headerValueSubscription: Subscription;
  lecternSubscription: Subscription;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.headerValueSubscription = this.localStorageService.observableHeaderType.subscribe(value => {
      this.tabsType = value;
      console.log('VALUE CHANGED: ' + this.tabsType);
    });

    this.lecternSubscription = this.localStorageService.observableLectern.subscribe(lectern =>
      this.lectern = lectern);
  }

  ngOnDestroy() {
    this.headerValueSubscription.unsubscribe();
    this.lecternSubscription.unsubscribe();
  }

}
