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
  semester: Semester = new Semester();
  countOfSem: number;
  name: string;
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
      this.plan.countOfSem = this.countOfSem;
      this.plan.coefficient = this.coefficient;
      this.updateWeeks();
      this.updateSubjects();
	     this.recalculateFreeHours();
      this.formForCreationServiceService.editPlan(this.plan).subscribe( plan => {
	    this.dialogRef.close(this.plan); }
	    );

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
        this.formForCreationServiceService.getPlanById(parseInt(event.value, 10)).subscribe(plan => {
		    this.plan = plan;
		    this.oldCountOfSem = this.plan.countOfSem;
		  });

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
		    this.semester.number = i;
		    this.semester.hoursPerWeek = 0;
		    this.semester.hoursPerWeek = 0;
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
			if (subject.freeHours - semester.hoursPerWeek * this.plan.weeks[subject.semesters.indexOf(semester)].count > 0) {
				subject.freeHours = subject.freeHours - semester.hoursPerWeek * this.plan.weeks[subject.semesters.indexOf(semester)].count;
			} else {
				if (this.notification.length === 0) {
					this.notification = subject.name + ' - ';
				}
				this.index = subject.semesters.indexOf(semester) + 1;
				this.notification = this.notification + ' ' + this.index + ',';
				semester.hoursPerWeek = 0;
				semester.creditUnits = 0;
			}
		});
		 if (this.notification.length != 0) {
			this.notification = this.notification.substring(0, this.notification.length - 1);
			this.notifications = this.notifications + this.notification + '\n';
		}
      });
	  if (this.notifications.length != 0) {
			this.notifications = 'Из-за превышения часов были обнулены семестры для предметов:\n' + this.notifications;
			window.alert(this.notifications);
		}
  }

  public updateWeeks() {
	  this.weeks.forEach((weekCount) => {
		  this.indexWeek = this.weeks.indexOf(weekCount);
		  if (this.indexWeek < this.plan.weeks.length) {
			  this.plan.weeks[this.indexWeek].count = this.weeks[this.indexWeek].count;
		  } else {
			  this.plan.weeks.push(this.weeks[this.indexWeek]);
		  }
	  });
  }
}
