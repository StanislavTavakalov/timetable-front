import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {TeacherService} from '../../services/lectern/teacher.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {ActivatedRoute} from '@angular/router';
import {Teacher} from '../../model/teacher.model';
import {Subscription} from 'rxjs';
import {LecternUtilityService} from '../../services/lectern/lectern-utility.service';


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
              private lecternUtilityService: LecternUtilityService,
              private route: ActivatedRoute) {

  }

  teachers: Teacher[];
  teacherServiceSubscription: Subscription;
  lecternServiceSubscription: Subscription;
  teacherTableVisible = false;
  isTeacherLoading = false;

  ngOnInit() {
    this.isTeacherLoading = true;
    const lecternId = this.route.snapshot.paramMap.get('id');
    this.lecternUtilityService.loadCurrentUser();
    this.lecternUtilityService.loadLecternToLocalStorageIfNeeded(lecternId);

    this.teacherServiceSubscription = this.teacherService.getTeachers(lecternId).subscribe(teachers => {
      this.isTeacherLoading = false;
      this.teachers = teachers;
      this.teacherTableVisible = true;
    }, error => {
      this.isTeacherLoading = false;
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
