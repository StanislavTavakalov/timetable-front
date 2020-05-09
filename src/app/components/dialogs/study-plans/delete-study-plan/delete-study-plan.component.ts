import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StudyPlanService} from '../../../../services/lectern/study-plan.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-delete-study-plan',
  templateUrl: './delete-study-plan.component.html',
  styleUrls: ['./delete-study-plan.component.css']
})
export class DeleteStudyPlanComponent implements OnInit, OnDestroy {

  studyPlanServiceSubscription: Subscription;
  loading = false;

  constructor(private studyPlanService: StudyPlanService,
              private dialogRef: MatDialogRef<DeleteStudyPlanComponent>,
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
    this.studyPlanServiceSubscription = this.studyPlanService.deleteStudyPlan(this.data.studyPlanId).subscribe(response => {
        this.notifierService.notify('success', 'Учебный план был удален.');
        this.dialogRef.close(true);
      }, error => {
        this.notifierService.notify('error', 'Не удалось удалить учебный план.');
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
