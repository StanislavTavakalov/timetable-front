import {Component, Inject, OnInit} from '@angular/core';
import {FormForCreationServiceService} from '../../services/form-for-creation-service.service';
import {StudyPlan} from '../../model/study-plan.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Semester} from '../../model/semester.model';
import {WeekCount} from '../../model/week-count.model';


@Component({
  selector: 'app-form-for-creation',
  templateUrl: './form-for-creation.component.html',
  styleUrls: ['./form-for-creation.component.css']
})
export class FormForCreationComponent implements OnInit {

  newFree: number;
  plan: StudyPlan = new StudyPlan();
  weekCount: WeekCount = new WeekCount();
  semester: Semester = new Semester();
  countOfSem: number;
  coefficient: number;
  weeks: WeekCount[] = [];
  formGroup: any;
  formGroupHours: any;
  plans: StudyPlan[];
  oldCountOfSem: number;
  notification: string;
  index: number;
  notifications = '';
  indexWeek: number;
  flag: boolean;


  constructor(private formForCreationServiceService: FormForCreationServiceService,
              public dialogRef: MatDialogRef<FormForCreationComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      plans: new FormControl('', [Validators.required]),
      coefficient: new FormControl('', [Validators.required, Validators.min(1), Validators.max(15), Validators.pattern('[0-9]{1,2}')]),
      course: new FormControl('', [Validators.required, Validators.min(0), Validators.max(12), Validators.pattern('[0-9]{1,2}')]),
    });
    this.formGroup.controls.coefficient.setValue(3);
    this.coefficient = 3;
    this.formForCreationServiceService.getPlansByLecternId(this.data.lectern).subscribe(plans => {
      this.plans = plans;
    });
    this.countOfSem = 0;
  }


  public add(): void {
    if (this.formGroup.valid && this.formGroupHours.valid) {
      this.plan.countOfSem = this.countOfSem;
      this.plan.coefficient = this.coefficient;
      this.plan.subjects.forEach((subject) => {
        if (subject.semesters === undefined) {
          subject.semesters = [];
        } else {
          subject.semesters.sort((a, b) => a.number - b.number);
        }
      });
      this.plan.weeks.sort((a, b) => a.position - b.position);
      this.checkPereodicSeverity();
      if (!this.flag) {
        window.alert('Семестры не могут быть сокращены так, как для них уже распределены переодические нагрузки');
      } else {
        this.updateWeeks();
        this.updateSubjects();
        this.recalculateFreeHours();
        this.dialogRef.close(this.plan);
      }
    } else {
        window.alert('Заполните обязательные поля в корректном формате');
      }
    }

    public checkPereodicSeverity() {
      this.flag = true;
      this.plan.subjects.forEach((subject) => {
          subject.pereodicSeverities.forEach((pereodic) => {
            pereodic.semesterNumbers.forEach((semesterNumber) => {
              if (semesterNumber.number > this.countOfSem) {
                this.flag = false;
              }
            });
          });
        });
    }

    public valuesf(num, event): void {
    if (num === 0) {
      this.countOfSem = parseInt(event.currentTarget.value, 10);
      this.formGroupHours = new FormGroup({});
      for (let i = 0; i < this.countOfSem; i++) {
        this.formGroupHours.addControl('hours' + i, new FormControl('', [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern('[0-9]{1,2}')]));
        this.formGroupHours.controls['hours' + i].setValue('15');
        this.weekCount.count = 15;
        this.weekCount.position = i + 1;
        this.weeks[i] = JSON.parse(JSON.stringify(this.weekCount));
       }
    } else if (num === 2) {
      this.coefficient = parseInt(event.currentTarget.value, 10);
    } else if (num === 1)  {
        this.formForCreationServiceService.getPlanById(event.value).subscribe(plan => {
          this.plan = plan;
          if (this.plan.subjects !== undefined && this.plan.subjects.length !== 0) {
            if (this.plan.subjects[0].semesters !== undefined) {
              this.oldCountOfSem = this.plan.subjects[0].semesters.length;
            } else {
              this.oldCountOfSem = 0;
            }
          }
        });
    }
  }

  public changeWeeks(num, event) {
    this.weekCount.count = parseInt(event.currentTarget.value, 10);
    this.weekCount.position = num + 1;
    this.weeks[num] = JSON.parse(JSON.stringify(this.weekCount));
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  public updateSubjects() {
    if (this.oldCountOfSem < this.plan.countOfSem) {
      for (let i = this.oldCountOfSem; i < this.countOfSem; i++) {
        this.plan.subjects.forEach((subject) => {
          this.semester.number = i + 1;
          this.semester.hoursPerWeek = 0;
          this.semester.creditUnits = 0;
          subject.semesters[i] = JSON.parse(JSON.stringify(this.semester));
        });
      }
    } else {
      this.plan.weeks = this.plan.weeks.slice(0, this.countOfSem);
      this.plan.subjects.forEach((subject) => {
        subject.semesters = subject.semesters.slice(0, this.countOfSem);
      });
    }
    for (let i = 0; i < this.plan.subjects.length; i++) {
      this.newFree = 0;
      this.plan.subjects[i].semesters.forEach((semester) => {
        this.newFree = this.newFree + semester.hoursPerWeek;
      });
      this.plan.subjects[i].freeHours = this.plan.subjects[i].sumOfHours - this.newFree;
    }

  }

  public recalculateFreeHours() {
    this.plan.subjects.forEach((subject) => {
      this.notification = '';
      subject.freeHours = subject.sumOfHours;
      subject.semesters.forEach((semester) => {
        if (subject.freeHours - semester.hoursPerWeek * this.plan.weeks[subject.semesters.indexOf(semester)].count > -1) {
          subject.freeHours = subject.freeHours - semester.hoursPerWeek * this.plan.weeks[subject.semesters.indexOf(semester)].count;
        } else {
          if (this.notification.length === 0) {
            this.notification = subject.name + ' - ';
          }
          this.index = semester.number;
          this.notification = this.notification + ' ' + this.index + ',';
          semester.hoursPerWeek = 0;
          semester.creditUnits = 0;
        }});
      if (this.notification.length !== 0) {
        this.notification = this.notification.substring(0, this.notification.length - 1);
        this.notifications = this.notifications + this.notification + '\n';
      }
      });
    if (this.notifications.length !== 0) {
      this.notifications = 'Из-за превышения часов были обнулены семестры для предметов:\n' + this.notifications;
      window.alert(this.notifications);
    }
  }

  public updateWeeks() {
    this.weeks.forEach((weekCount) => {
      this.indexWeek = this.weeks.indexOf(weekCount);
      if (this.plan.weeks === undefined) {
      this.plan.weeks = [];
      }
      if (this.indexWeek < this.plan.weeks.length) {
        this.plan.weeks[this.indexWeek] = this.weeks[this.indexWeek];
      } else {
        this.plan.weeks.push(this.weeks[this.indexWeek]);
      }
    });
  }
}
