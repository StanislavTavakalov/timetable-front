import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../../services/lectern/subject.service';
import {Subject} from '../../../model/subject.model';
import {Subscription} from 'rxjs';
import {PereodicSeveritySubject} from '../../../model/pereodic-severity-subject.model';
import {SubjectDeleteComponent} from '../../dialogs/subjects/subject-delete/subject-delete.component';
import {OperationResponse} from '../../../model/operation-response.model';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private subjectService: SubjectService,
              private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private router: Router) {
  }

  subject: Subject;
  subjectServiceSubscription: Subscription;
  lecternId;
  loading = false;

  ngOnInit() {

    this.loading = true;
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.lecternId = this.route.snapshot.paramMap.get('id');
    if (subjectId) {
      this.subjectServiceSubscription = this.subjectService.getSubject(subjectId).subscribe(subject => {
          this.subject = subject;
          this.loading = false;
        },
        error => {
          console.log('error');
        }
      );
    }
  }


  private isTemplate(isTemplate: boolean): string {
    return isTemplate ? 'Да' : 'Нет';
  }

  private getSemesters(pereodicSeveritySubject: PereodicSeveritySubject) {
    const semArray = pereodicSeveritySubject.semesterNumbers.map(semNum => semNum.number);
    let sortedSemNumbers: Array<number> = null;
    sortedSemNumbers = semArray.sort((a, b) => a - b);
    return sortedSemNumbers.toString();
  }

  deleteSubject() {
    const dialogRef = this.dialog.open(SubjectDeleteComponent, {
      width: '20%',
      height: '25%',
      data: {subjectId: this.subject.id},
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    this.subjectServiceSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse && operationResponse.errorMessage === null && operationResponse.isOperationCompleted) {
        this.notifierService.notify('success', 'Предмет был удален');
        this.router.navigate(['lectern/' + this.lecternId + '/subjects']);
      } else if (operationResponse && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  onEditClick() {
    this.router.navigate(['lectern/' + this.lecternId + '/subjects/subject-edit/' + this.subject.id]);
  }


  ngOnDestroy(): void {
    if (this.subjectServiceSubscription) {
      this.subjectServiceSubscription.unsubscribe();
    }
  }

}
