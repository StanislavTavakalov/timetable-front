import {Component, OnInit, OnDestroy} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {Subscription} from 'rxjs';
import {HeaderType} from '../../model/header-type';
import {Lectern} from '../../model/lectern.model';
import {Deanery} from '../../model/deanery.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  deaneryLinks = [{
    path: '/lecterns',
    label: 'Кафедры',
    isActive: true
  }, {
    path: '/staff',
    label: 'Сотрудники',
    isActive: true
  }, {
    path: '/groups',
    label: 'Группы',
    isActive: true
  }, {
    path: '/flows',
    label: 'Потоки',
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
  }, {
    path: '/distribution_courses_semesters',
    label: 'Распределение по семестрам',
    isActive: true
  }, {

    path: '/groups_and_flows',
    label: 'Группы и потоки',
    isActive: true
  },
  ];

  tabsType: HeaderType;
  lectern: Lectern;
  deanery: Deanery;
  headerValueSubscription: Subscription;
  lecternSubscription: Subscription;
  deanerySubscription: Subscription;

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.headerValueSubscription = this.localStorageService.observableHeaderType.subscribe(value => {
      this.tabsType = value;
    });

    this.lecternSubscription = this.localStorageService.observableLectern.subscribe(lectern =>
      this.lectern = lectern);

    this.deanerySubscription = this.localStorageService.observableDeanery.subscribe(deanery =>
      this.deanery = deanery);
  }

  ngOnDestroy() {
    this.headerValueSubscription.unsubscribe();
    this.lecternSubscription.unsubscribe();
    this.deanerySubscription.unsubscribe();
  }

  private navigateToAccount() {
    window.location.href = 'http://localhost:8080/mypage';
  }

}
