import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StudyPlanService} from '../../../../services/lectern/study-plan.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {StudyPlanStatus} from '../../../../model/study-plan-status.model';

@Component({
  selector: 'app-submit-study-plan',
  templateUrl: './submit-study-plan.component.html',
  styleUrls: ['./submit-study-plan.component.css']
})
export class SubmitStudyPlanComponent implements OnInit, OnDestroy {

  studyPlanServiceSubscription: Subscription;
  loading = false;

  constructor(private studyPlanService: StudyPlanService,
              private dialogRef: MatDialogRef<SubmitStudyPlanComponent>,
              private notifierService: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }


  onCancelClick() {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.loading = true;
    this.data.studyPlan.status = StudyPlanStatus.Submitted;
    this.data.studyPlan.statusApplyDate = new Date();
    this.studyPlanServiceSubscription = this.studyPlanService.editStudyPlan(this.data.studyPlan).subscribe(response => {
        this.notifierService.notify('success', 'Учебный план был утвержден.');
        this.dialogRef.close(true);
      }, error => {
        this.notifierService.notify('error', 'Не удалось утвердить учебный план.');
        this.dialogRef.close(false);
      }
    );

  }

  ngOnDestroy(): void {
    if (this.studyPlanServiceSubscription) {
      this.studyPlanServiceSubscription.unsubscribe();
    }
  }
}
