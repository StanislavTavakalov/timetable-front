import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {TeacherService} from '../../services/lectern/teacher.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {ActivatedRoute} from '@angular/router';
import {Lectern} from '../../model/lectern.model';
import {Teacher} from '../../model/teacher.model';
import {Subscription} from 'rxjs';
import {HeaderType} from '../../model/header-type';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private localStorageService: LocalStorageService,
              private teacherService: TeacherService,
              private lecternService: LecternService,
              private route: ActivatedRoute) {

  }

  lectern: Lectern;
  teachers: Teacher[];
  teacherServiceSubscription: Subscription;
  lecternServiceSubscription: Subscription;
  teacherTableVisible = false;
  loading = false;

  ngOnInit() {

    this.loading = true;
    // setting lectern id when we get to this Lectern section
    const lecternId = this.route.snapshot.paramMap.get('id');

    this.localStorageService.observableHeaderType.next(HeaderType.LECTERN);
    // loading of Lectern if it is null or id changed
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== lecternId) {
      this.lecternServiceSubscription = this.lecternService.getLecternById(lecternId).subscribe(value => {
        this.lectern = value;
        this.localStorageService.observableLectern.next(this.lectern);
        console.log(this.lectern);
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить кафедру.');
      });
    }

    this.teacherServiceSubscription = this.teacherService.getTeachers(lecternId).subscribe(teachers => {
      this.loading = false;
      this.teachers = teachers;
      this.teacherTableVisible = true;
    }, error => {
      this.loading = false;
      this.teacherTableVisible = true;
      this.notifierService.notify('error', 'Не удалось загрузить преподавателей.');
    });
  }

  ngOnDestroy(): void {
    if (this.teacherServiceSubscription) {
      this.teacherServiceSubscription.unsubscribe();
    }

    if (this.lecternServiceSubscription) {
      this.lecternServiceSubscription.unsubscribe();
    }
  }

}
