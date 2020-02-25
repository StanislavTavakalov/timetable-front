import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Subject} from '../../../model/subject.model';
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
    this.subject = subject;
    this.editSubjectForm = this.fb.group({
      subjectName: [subject.name, [Validators.required, Validators.maxLength(15)]],
      severities: this.fb.array(subject.severities.map(sev => this.addSeverity(sev))),
      pereodicSeverities: this.fb.array(subject.pereodicSeverities.map(pSev => this.addPereodicSeverity(pSev)))
    });
    this.severitySubjectList = subject.severities;
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
    for (const severity of this.subject.severities) {
      for (const sevForm of this.severities.controls) {
        if (severity.severity.name === sevForm.value.name) {
          severity.hours = sevForm.value.hours as number;
        }
      }
    }

    for (const periodicSeverity of this.subject.pereodicSeverities) {
      for (const perSevForm of this.pereodicSeverities.controls) {
        if (periodicSeverity.severity.name === perSevForm.value.name) {
          periodicSeverity.semesterNumbers = perSevForm.value.semesterNumbers.split(',').map(Number);
        }
      }
    }
    this.subject.isChanged = true;
    this.subject.name = this.subjectName.value as string;
    this.dialogRef.close();
  }

  get severities() {
    return this.editSubjectForm.get('severities') as FormArray;
  }

  get pereodicSeverities() {
    return this.editSubjectForm.get('pereodicSeverities') as FormArray;
  }

  addSeverity(sev: SeveritySubject) {
    return this.fb.group({
      name: sev.severity.name,
      hours: sev.hours
    });
  }

  addPereodicSeverity(pSev: PereodicSeveritySubject) {
    return this.fb.group({
      name: pSev.severity.name,
      semesterNumbers: pSev.semesterNumbers.toString()
    });
  }


}
