import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudyPlan} from '../../../model/study-plan.model';
import {EducationForm} from '../../../model/education-form.model';
import {Speciality} from '../../../model/speciality.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StudyPlanStatus} from '../../../model/study-plan-status.model';
import {Subject} from '../../../model/subject.model';
import {Severity} from '../../../model/severity.model';
import {SeveritySubject} from '../../../model/severity-subject.model';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  editSubjectForm: FormGroup;
  message: string;
  subject: Subject;
  severitySubjectList: SeveritySubject[];

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditSubjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.initializeForm(this.data.subject);
  }

  private initializeForm(subject: Subject) {
    // this.createStudyPlanForm = this.fb.group({
    //   studyPlanName: [studyPlan.name, [Validators.required, Validators.maxLength(15)]],
    //   educationForm: [studyPlan.educationForm, [Validators.required]],
    //   speciality: [studyPlan.speciality, [Validators.required]],
    // });
    console.log('Initttt');
    console.log(subject);
    console.log(subject.severities);
    this.editSubjectForm = this.fb.group({

      subjectName: [subject.name, [Validators.required, Validators.maxLength(15)]],
      // severities: this.fb.array(subject.severities)
      severities: this.fb.array(subject.severities.map(sev => this.newSeverity(sev)))
    });
    this.severitySubjectList = subject.severities;
    console.log(this.editSubjectForm.controls['severities']);

  }

  createSeverity(severity: SeveritySubject) {

    return this.fb.group({
      severityName: [severity.severity.name, [Validators.required, Validators.maxLength(15)]],
      hours: [severity.hours, [Validators.required, Validators.maxLength(15)]]
    });

  }


  getErrorText(controlName: string): string {
    const control = this.editSubjectForm.get(controlName) as FormControl;
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

  get subjectName(): FormControl {
    return this.editSubjectForm.get('subjectName') as FormControl;
  }


  onCancelClick() {
    this.dialogRef.close();
  }

  confirm() {
    console.log(confirm);
    console.log(this.severities.controls);
    for (let i = 0; i < this.severities.controls.length; i ++){
      console.log(this.severities.controls[i].value);
    }
    // var value = this.editSubjectForm.get('severities') as FormArray;
    // console.log(value.at(0));
    // console.log(value.at(1));
    this.dialogRef.close();
  }

  get severities() {
    return this.editSubjectForm.get('severities') as FormArray;
  }

  newSeverity(sev: SeveritySubject) {
    return this.fb.group({
      name: sev.severity.name,
      hours: sev.hours
    });
  }


}
