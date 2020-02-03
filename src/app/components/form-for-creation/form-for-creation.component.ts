import {Component, Inject, OnInit} from '@angular/core';
import {FormForCreationServiceService} from '../../services/form-for-creation-service.service';
import {StudyPlan} from '../../model/study-plan.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {CreateStudyPlanComponent} from '../dialogs/create-study-plan/create-study-plan.component';
import {Semester} from '../../model/semester.model';
import {Subject} from '../../model/subject.model';
import {DOCUMENT} from '@angular/common';
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
  countOfSem: number;
  name: string;
  coefficient: number;
  weeks: WeekCount[] = [];
  formGroup: any;
  formGroupHours: any;
  plans: StudyPlan[];
  oldCountOfSem: number;


  constructor( private formForCreationServiceService: FormForCreationServiceService, public dialogRef: MatDialogRef<FormForCreationComponent>) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      plans: new FormControl('', [Validators.required]),
      coefficient: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])

    });
    this.formGroup.controls.coefficient.setValue(3);
    this.coefficient = 3;
    this.formForCreationServiceService.getPlans().subscribe(plans => {
      this.plans = plans;
    });
    this.countOfSem = 0;
  }


  public add(): void {
    if (this.formGroup.valid && this.formGroupHours.valid) {
      this.plan.name = this.name;
      this.plan.weeks = this.weeks;
      this.plan.countOfSem = this.countOfSem;
      this.plan.coefficient = this.coefficient;
      this.formForCreationServiceService.editPlan(this.plan);
      this.updateSubjects();
      this.dialogRef.close(this.plan);
      /*this.formForCreationServiceService.editPlan(this.plan).subscribe(() => {
        window.alert('Учебный план успешно создан');
      });*/
    } else {
        window.alert('Заполните обязательные поля');
      }
    }


  public valuesf(num, event): void {
    if (num === 0) {
      this.countOfSem = parseInt(event.value, 10);
      this.formGroupHours = new FormGroup({});
      for (let i = 0; i < this.countOfSem; i++) {
        this.formGroupHours.addControl('hours' + i, new FormControl('', [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern('[0-9]{1,2}')]));
        this.formGroupHours.controls['hours' + i].setValue('15');
        this.weekCount.count = 15;
        this.weeks[i] = JSON.parse(JSON.stringify(this.weekCount));
       }

    } else if (num === 2) {
      this.coefficient = parseInt(event.currentTarget.value, 10);
    } else if (num === 1)  {
      this.formForCreationServiceService.getPlanById(parseInt(event.value, 10)).subscribe(plan => this.plan = plan);
      this.oldCountOfSem = this.plan.countOfSem;
    } else if (num === 3) {
      this.name = event.currentTarget.value;
    }

  }

  public changeWeeks(num, event) {
    this.weekCount.count = parseInt(event.currentTarget.value, 10);
    this.weeks[num] = JSON.parse(JSON.stringify(this.weekCount));
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  public updateSubjects() {
    if (this.oldCountOfSem < this.plan.countOfSem) {
      for (let i = this.oldCountOfSem; i < this.countOfSem; i++) {
        this.plan.subjects.forEach((subject) => {
          subject.semesters.push({id: 10, number: i, hoursPerWeek: 0, creditUnits: 0});
        });
      }
    } else {
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
}
