import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  navLinks = [{
    path: '/study-plan',
    label: 'Учебный план',
    isActive: true
  }, {
    path: '/timetable',
    label: 'Расписание занятий',
    isActive: true
  }, {
    path: '/schedule',
    label: 'Магистратура расписание',
    isActive: true
  }]

  constructor() {
  }

  ngOnInit() {
  }

}
