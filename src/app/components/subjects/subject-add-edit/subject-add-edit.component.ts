import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubjectService} from '../../../services/lectern/subject.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {defaultSubject, Subject} from '../../../model/subject.model';
import {NotifierService} from 'angular-notifier';
import {PereodicSeveritySubject} from '../../../model/pereodic-severity-subject.model';
import {LocalStorageService} from '../../../services/local-storage.service';
import {LecternService} from '../../../services/lectern/lectern.service';
import {SemesterNumber} from '../../../model/semester-number.model';
import {MatDialog} from '@angular/material';
import {SeverityListComponent} from '../../dialogs/subjects/severity-list/severity-list.component';
import {SeveritySubject} from '../../../model/severity-subject.model';
import {PereodicSeverityListComponent} from '../../dialogs/subjects/pereodic-severity-list/pereodic-severity-list.component';

@Component({
  selector: 'app-subject-add-edit',
  templateUrl: './subject-add-edit.component.html',
  styleUrls: ['./subject-add-edit.component.css']
})
export class SubjectAddEditComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectService: SubjectService,
              private notifierService: NotifierService,
              private localStorageService: LocalStorageService,
              private lecternService: LecternService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
  }

  private loading = false;
  private subjectSubscription: Subscription;
  private severityListSubscription: Subscription;
  private pereodicSeverityListSubscription: Subscription;
  private lecternId;
  private subject: Subject;
  private subjectForm: FormGroup;
  private severities: FormArray;
  private pereodicSeverities: FormArray;
  private isEditMode: boolean;
  private reservedHours = 0;

  ngOnInit() {
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.lecternId = this.route.snapshot.paramMap.get('id');
    if (subjectId) {
      this.loading = true;
      this.isEditMode = true;
      this.subjectSubscription = this.subjectService.getSubject(subjectId).subscribe(subject => {
        this.subject = subject;
        this.initializeForm(subject);
        this.fullFillSeverities(subject);
        this.fullFillPereodicSeverities(subject);
        this.reservedHours = subject.sumOfHours - subject.freeHours;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.notifierService.notify('error', 'Предмет не был найден');
        this.router.navigate(['lectern/' + this.lecternId + '/subjects']);
      });
    } else {
      this.loading = true;
      this.isEditMode = false;
      this.subject = defaultSubject;
      if (this.localStorageService.observableLectern.getValue()) {
        this.subject.department = this.localStorageService.observableLectern.getValue().name;
        this.loading = false;
        this.initializeForm(this.subject);
      } else {
        this.lecternService.getLecternById(this.lecternId).subscribe(
          lectern => {
            this.localStorageService.observableLectern.next(lectern);
            this.subject.department = lectern.name;
            this.loading = false;
            this.initializeForm(this.subject);
          }
        );
      }
    }
  }

  private initializeForm(subject: Subject) {
    this.subjectForm = this.formBuilder.group({
      id: [subject.id],
      name: [subject.name, [Validators.required, Validators.maxLength(1000)]],
      description: [subject.description, Validators.maxLength(10000)],
      abbreviation: [subject.abbreviation, [Validators.required, Validators.maxLength(255)]],
      department: [subject.department, Validators.required],
      sumOfHours: [subject.sumOfHours, Validators.min(0)],
      freeHours: [subject.freeHours, Validators.min(0)],
      template: [subject.template],
      severities: this.formBuilder.array([], Validators.maxLength(10)),
      pereodicSeverities: this.formBuilder.array([], Validators.maxLength(10))
    });
  }

  private fullFillSeverities(subject: Subject) {
    this.severities = this.subjectForm.get('severities') as FormArray;
    if (subject.severities != null) {
      subject.severities.forEach(severitySubject => {
        this.severities.push(this.formBuilder.group({
          id: severitySubject.id,
          severity: this.formBuilder.group({
            id: [severitySubject.severity.id, Validators.required],
            name: [severitySubject.severity.name, Validators.required],
          }),
          hours: [severitySubject.hours, [Validators.required, Validators.min(1), Validators.max(99)]],
        }));
      });
    }
    console.log(this.severities);
  }

  private fullFillPereodicSeverities(subject: Subject) {
    this.pereodicSeverities = this.subjectForm.get('pereodicSeverities') as FormArray;
    if (subject.pereodicSeverities != null) {
      subject.pereodicSeverities.forEach(pereodicSeverity => {
        this.pereodicSeverities.push(this.formBuilder.group({
          id: pereodicSeverity.id,
          pereodicSeverity: this.formBuilder.group({
            id: [pereodicSeverity.pereodicSeverity.id, Validators.required],
            name: [pereodicSeverity.pereodicSeverity.name, Validators.required],
          }),
          semesterNumbers: this.createSemesterNumberFormGroup(pereodicSeverity.semesterNumbers),
        }));
      });
    }
    console.log(this.pereodicSeverities);
  }

  private createSemesterNumberFormGroup(semesterNumbers: SemesterNumber[]) {
    const semesterArray: FormArray = this.formBuilder.array([], Validators.maxLength(10));
    for (const semesterNumber of semesterNumbers) {
      semesterArray.push(this.formBuilder.group({
          id: [semesterNumber.id, Validators.required],
          number: [semesterNumber.number, Validators.required]
        })
      );
    }
    return semesterArray;
  }

  private addSeverity() {
    let severities: SeveritySubject[];
    severities = this.subjectForm.get('severities').value;
    const dialogRef = this.dialog.open(SeverityListComponent, {
      data: {excludeSeverityIds: severities.map(row => row.severity.id)}
    });

    this.severityListSubscription = dialogRef.afterClosed().subscribe(severityList => {
        if (severityList) {
          for (const sev of severityList) {
            this.severities = this.subjectForm.get('severities') as FormArray;
            this.severities.push(this.formBuilder.group({
              id: null,
              severity: this.formBuilder.group({
                id: [sev.id, Validators.required],
                name: [sev.name, Validators.required],
              }),
              hours: [0, [Validators.required, Validators.min(1), Validators.max(99)]],
            }));
          }
        }
      }
    );
  }


  private addPereodicSeverity() {
    let pereodicSeverities: PereodicSeveritySubject[];
    pereodicSeverities = this.subjectForm.get('pereodicSeverities').value;
    const dialogRef = this.dialog.open(PereodicSeverityListComponent, {
      data: {excludePereodicSeverityIds: pereodicSeverities.map(row => row.pereodicSeverity.id)}
    });

    this.pereodicSeverityListSubscription = dialogRef.afterClosed().subscribe(pereodicSeverityList => {
        if (pereodicSeverityList) {
          for (const perSev of pereodicSeverityList) {
            this.pereodicSeverities = this.subjectForm.get('pereodicSeverities') as FormArray;
            this.pereodicSeverities.push(this.formBuilder.group({
              id: null,
              pereodicSeverity: this.formBuilder.group({
                id: [perSev.id, Validators.required],
                name: [perSev.name, Validators.required],
              }),
              semesterNumbers: this.formBuilder.array([], Validators.maxLength(10)),
            }));
          }
        }
      }
    );
  }

  private deleteSeverity(index: number, severitySubject: SeveritySubject) {
    if (this.getCurrentFreeHoursValue() - severitySubject.hours < 0) {
      this.notifierService.notify('error', 'Нельзя удалить нагрузку! Часы нагрузки распределены.');
    } else {
      this.severities = this.subjectForm.get('severities') as FormArray;
      this.severities.removeAt(index);
    }
  }

  private deletePereodicSeverity(index: number) {
    this.pereodicSeverities = this.subjectForm.get('pereodicSeverities') as FormArray;
    this.pereodicSeverities.removeAt(index);
  }


  // private addSemesterNumber() {
  //
  //   const semesterNumber: SemesterNumber = new SemesterNumber();
  //   semesterNumber.id = '123123';
  //   semesterNumber.number = 1;
  //   this.pereodicSeverities = this.subjectForm.get('pereodicSeverities') as FormArray;
  //   this.pereodicSeverities.push(this.formBuilder.group({
  //     id: null,
  //     severity: this.formBuilder.group({
  //       id: [severity.id, Validators.required],
  //       name: [severity.name, Validators.required],
  //     }),
  //     hours: null,
  //   }));
  // }

  private getSemesters(pereodicSeveritySubject: PereodicSeveritySubject) {
    const semArray = pereodicSeveritySubject.semesterNumbers.map(semNum => semNum.number);
    let sortedSemNumbers: Array<number> = null;
    sortedSemNumbers = semArray.sort((a, b) => a - b);
    return sortedSemNumbers.toString();
  }

  private updateSubjectTemplate() {
    const subjectToSave: Subject = this.subjectForm.value;
    subjectToSave.sumOfHours = subjectToSave.severities.map(severity => severity.hours).reduce((a, b) => a + b, 0) as number;
    subjectToSave.freeHours = subjectToSave.sumOfHours - this.reservedHours;

    this.subjectSubscription = this.subjectService.editSubject(subjectToSave).subscribe(subject => {
      this.router.navigate(['lectern/' + this.lecternId + '/subjects/' + subject.id]);
      this.notifierService.notify('success', 'Шаблон предмета был изменен');
    }, error => {
      this.notifierService.notify('error', 'Предмет не был создан');
      this.router.navigate(['lectern/' + this.lecternId + '/subjects']);
    });
  }

  private createSubjectTemplate() {
    const subjectToSave: Subject = this.subjectForm.value;
    subjectToSave.sumOfHours = subjectToSave.severities.map(severity => severity.hours).reduce((a, b) => a + b, 0) as number;
    console.log(subjectToSave.severities.map(severity => severity.hours).reduce((a, b) => a + b, 0));
    subjectToSave.freeHours = subjectToSave.sumOfHours;
    subjectToSave.template = true;

    this.subjectSubscription = this.subjectService.createSubject(subjectToSave).subscribe(subject => {
      this.router.navigate(['lectern/' + this.lecternId + '/subjects']);
      this.notifierService.notify('success', 'Шаблон предмета был добавлен');
    }, error => {
      this.notifierService.notify('error', 'Предмет не был создан');
      this.router.navigate(['lectern/' + this.lecternId + '/subjects']);
    });
    console.log(subjectToSave);
  }

  private onCancelClick() {
    this.router.navigate(['lectern/' + this.lecternId + '/subjects']);
  }

  private getCurrentSumOfHoursValue(): number {
    let severities: SeveritySubject[];
    severities = this.subjectForm.get('severities').value;
    return severities.map(severity => severity.hours).reduce((a, b) => a + b, 0);
  }

  private getCurrentFreeHoursValue(): number {
    let severities: SeveritySubject[];
    severities = this.subjectForm.get('severities').value;
    return severities.map(severity => severity.hours).reduce((a, b) => a + b, 0) - (this.reservedHours);
  }

  ngOnDestroy(): void {
    if (this.subjectSubscription) {
      this.subjectSubscription.unsubscribe();
    }
  }

}
