import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {StudyPlan} from '../../../../model/study-plan.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PrinterUtilityService} from '../../../../services/util/printer-utility.service';

@Component({
  selector: 'app-study-plan-details',
  templateUrl: './study-plan-details.component.html',
  styleUrls: ['./study-plan-details.component.css']
})
export class StudyPlanDetailsComponent implements OnInit {

  currentStudyPlan: StudyPlan;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<StudyPlanDetailsComponent>,
              private printerUtilityService: PrinterUtilityService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.currentStudyPlan = this.data.currentStudyPlan;
  }


  onCloseClick() {
    this.dialogRef.close();
  }

}
