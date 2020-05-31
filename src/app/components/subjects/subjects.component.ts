import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {LocalStorageService} from '../../services/local-storage.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {SubjectService} from '../../services/lectern/subject.service';
import {Subject} from '../../model/subject.model';
import {LecternUtilityService} from '../../services/lectern/lectern-utility.service';

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
              private lecternUtilityService: LecternUtilityService,
              private subjectService: SubjectService,
              private lecternService: LecternService,
              private route: ActivatedRoute) {

  }

  subjects: Subject[];
  subjectServiceSubscription: Subscription;
  lecternServiceSubscription: Subscription;
  subjectTableVisible = false;
  isSubjectsLoading = false;

  ngOnInit() {
    this.isSubjectsLoading = true;
    const lecternId = this.route.snapshot.paramMap.get('id');
    this.lecternUtilityService.loadLecternToLocalStorageIfNeeded(lecternId);

    this.subjectServiceSubscription = this.subjectService.getSubjectsTemplates(lecternId).subscribe(subjects => {
      this.isSubjectsLoading = false;
      this.subjects = subjects;
      this.subjectTableVisible = true;
    }, error => {
      this.isSubjectsLoading = false;
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
