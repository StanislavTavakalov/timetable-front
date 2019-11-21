import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-study-plan',
  templateUrl: './create-study-plan.component.html',
  styleUrls: ['./create-study-plan.component.css']
})
export class CreateStudyPlanComponent implements OnInit {

  createStudyPlanForm: FormGroup;
  message: string;
  currentName: string = null;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateStudyPlanComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.initializeForm();
    this.message = this.data.message;
    this.currentName = this.data.currentName;
    console.log(this.currentName);
  }

  private initializeForm() {
    this.createStudyPlanForm = this.fb.group({
      studyPlanName: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  getErrorText(controlName: string): string {
    const control = this.createStudyPlanForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  private getErrorMessage(control: FormControl): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Заполните имя';
      }
      if (control.errors['maxlength']) {
        errorMessage = 'Max 15 digits';
      }
    }
    return errorMessage;
  }

  get studyPlanName(): FormControl {
    return this.createStudyPlanForm.get('studyPlanName') as FormControl;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  confirm() {
    const nameOfStudyPlan = this.createStudyPlanForm.controls.studyPlanName.value;
    console.log(this.currentName);
    if (this.currentName === undefined || this.currentName === null) {
      this.dialogRef.close({id: 555, name: nameOfStudyPlan, subjects: [], coefficient: 0, countOfSem: 0, weeks: 0, isChanged: false});
    } else {
      this.dialogRef.close(nameOfStudyPlan);
    }
  }
}
