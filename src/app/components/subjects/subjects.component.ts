import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {LocalStorageService} from '../../services/local-storage.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {ActivatedRoute} from '@angular/router';
import {Lectern} from '../../model/lectern.model';
import {Subscription} from 'rxjs';
import {HeaderType} from '../../model/header-type';
import {SubjectService} from '../../services/lectern/subject.service';
import {Subject} from '../../model/subject.model';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private localStorageService: LocalStorageService,
              private subjectService: SubjectService,
              private lecternService: LecternService,
              private route: ActivatedRoute) {

  }

  lectern: Lectern;
  subjects: Subject[];
  subjectServiceSubscription: Subscription;
  lecternServiceSubscription: Subscription;
  subjectTableVisible = false;
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

    this.subjectServiceSubscription = this.subjectService.getSubjectsTemplates(lecternId).subscribe(subjects => {
      this.loading = false;
      this.subjects = subjects;
      this.subjectTableVisible = true;
    }, error => {
      this.loading = false;
      this.subjectTableVisible = true;
      this.notifierService.notify('error', 'Не удалось загрузить предметы.');
    });

  }


  ngOnDestroy(): void {
    if (this.subjectServiceSubscription) {
      this.subjectServiceSubscription.unsubscribe();
    }

    if (this.lecternServiceSubscription) {
      this.lecternServiceSubscription.unsubscribe();
    }
  }

}
