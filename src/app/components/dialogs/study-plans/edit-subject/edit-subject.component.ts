import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Subject} from '../../../../model/subject.model';
import {SemesterNumber} from '../../../../model/semester-number.model';
import {SelectSemesterComponent} from '../select-semester/select-semester.component';
import {SeveritySubject} from '../../../../model/severity-subject.model';
import {checkFreeHours} from '../../../../validators/free-hours.validator';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  editSubjectForm: FormGroup;
  subject: Subject;
  private severities: FormArray;
  private pereodicSeverities: FormArray;
  private countOfSem: number;
  private reservedHours = 0;
  private isFreeHoursNegative = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditSubjectComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.countOfSem = this.data.countOfSem;

    this.initializeForm(this.data.subject);
    this.fullFillSeverities(this.data.subject);
    this.fullFillPereodicSeverities(this.data.subject);
  }

  private initializeForm(subject: Subject) {
    this.editSubjectForm = this.fb.group({
      id: [subject.id],
      name: [subject.name, [Validators.required, Validators.maxLength(20)]],
      description: [subject.description, Validators.maxLength(1000)],
      abbreviation: [subject.abbreviation, [Validators.required, Validators.maxLength(10)]],
      department: [subject.department],
      sumOfHours: [subject.sumOfHours, Validators.min(0)],
      freeHours: [subject.freeHours, Validators.min(0)],
      template: [subject.template],
      severities: this.fb.array([], Validators.maxLength(this.countOfSem)),
      pereodicSeverities: this.fb.array([], Validators.maxLength(this.countOfSem))
    }, {
      validators: checkFreeHours('freeHours')
    });

    this.reservedHours = subject.sumOfHours - subject.freeHours;
  }

  get subjectName(): FormControl {
    return this.editSubjectForm.get('subjectName') as FormControl;
  }

  get abbreviation(): FormControl {
    return this.editSubjectForm.get('abbreviation') as FormControl;
  }

  get freeHours(): FormControl {
    return this.editSubjectForm.get('freeHours') as FormControl;
  }

  get sumOfHours(): FormControl {
    return this.editSubjectForm.get('sumOfHours') as FormControl;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  confirm() {
    // console.log(this.editSubjectForm.getRawValue());
    const subject: Subject = this.editSubjectForm.getRawValue();
    subject.freeHours = this.getCurrentFreeHoursValue();
    subject.sumOfHours = this.getCurrentSumOfHoursValue();
    this.dialogRef.close(subject);
  }

  private fullFillSeverities(subject: Subject) {
    this.severities = this.editSubjectForm.get('severities') as FormArray;
    if (subject.severities != null) {
      subject.severities.forEach(severitySubject => {
        this.severities.push(this.fb.group({
          id: severitySubject.id,
          severity: this.fb.group({
            id: [severitySubject.severity.id, Validators.required],
            name: [severitySubject.severity.name, Validators.required],
          }),
          hours: [severitySubject.hours, [Validators.required, Validators.min(1), Validators.max(99)]],
        }));
      });
    }
  }

  private fullFillPereodicSeverities(subject: Subject) {
    this.pereodicSeverities = this.editSubjectForm.get('pereodicSeverities') as FormArray;
    if (subject.pereodicSeverities != null) {
      subject.pereodicSeverities.forEach(pereodicSeverity => {
        this.pereodicSeverities.push(this.fb.group({
          id: pereodicSeverity.id,
          pereodicSeverity: this.fb.group({
            id: [pereodicSeverity.pereodicSeverity.id, Validators.required],
            name: [pereodicSeverity.pereodicSeverity.name, Validators.required],
          }),
          semesterNumbers: this.createSemesterNumberFormGroup(pereodicSeverity.semesterNumbers),
        }));
      });
    }
  }

  private createSemesterNumberFormGroup(semesterNumbers: SemesterNumber[]) {
    const semesterArray: FormArray = this.fb.array([], Validators.maxLength(10));
    for (const semesterNumber of semesterNumbers) {
      semesterArray.push(this.fb.group({
          id: [semesterNumber.id],
          number: [semesterNumber.number, Validators.required]
        })
      );
    }
    return semesterArray;
  }

  public selectSemestersForPereodicSeverity(pereodicSeverity: FormGroup) {
    const selectedSemNumbers = [];
    const semesterNumbers: FormArray = pereodicSeverity.get('semesterNumbers') as FormArray;
    for (const semNumber of semesterNumbers.value) {
      selectedSemNumbers.push(semNumber.number);
    }

    const initialSemNumbers = this.fillInitialSemNumbersArray(this.countOfSem);

    const dialogRef = this.dialog.open(SelectSemesterComponent, {
      data: {excludeSemIds: selectedSemNumbers, semInitialIds: initialSemNumbers},
    });

    dialogRef.afterClosed().subscribe(semNumbers => {
      if (semNumbers) {
        semesterNumbers.clear();
        for (const semNum of semNumbers) {
          semesterNumbers.push(this.fb.group({
              id: [null],
              number: [semNum, Validators.required]
            })
          );
        }
      }

    });


  }

  private fillInitialSemNumbersArray(countOfSem: number): number[] {
    const arrayOfSem = [];
    for (let i = 1; i <= countOfSem; i++) {
      arrayOfSem.push(i);
    }
    return arrayOfSem;
  }

  private getCurrentSumOfHoursValue(): number {
    let severities: SeveritySubject[];
    severities = this.editSubjectForm.get('severities').value;
    return severities.map(severity => severity.hours).reduce((a, b) => a + b, 0);
  }

  private getCurrentFreeHoursValue(): number {
    let severities: SeveritySubject[];
    severities = this.editSubjectForm.get('severities').value;
    this.freeHours.setValue(severities.map(severity => severity.hours).reduce((a, b) => a + b, 0) - (this.reservedHours));
    this.isFreeHoursNegative = this.freeHours.value < 0;
    return this.freeHours.value;
  }


}
