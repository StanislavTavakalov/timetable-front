import {Component, OnInit} from '@angular/core';
import {FormForCreationServiceService} from '../../services/form-for-creation-service.service';
import {StudyPlan} from '../../model/study-plan.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {CreateStudyPlanComponent} from '../dialogs/create-study-plan/create-study-plan.component';
import {Semester} from '../../model/semester.model';
import {Subject} from '../../model/subject.model';


@Component({
  selector: 'app-form-for-creation',
  templateUrl: './form-for-creation.component.html',
  styleUrls: ['./form-for-creation.component.css']
})
export class FormForCreationComponent implements OnInit {

  public values: any = [];
  plan: StudyPlan = new StudyPlan();
  countOfSem: number;
  name: string;
  coefficient: number;
  weeks: number[] = [];
  formGroup: any;
  formGroupHours: any;
  plans: StudyPlan[];
  oldCountOfSem: number;


  constructor(private formForCreationServiceService: FormForCreationServiceService, public dialogRef: MatDialogRef<FormForCreationComponent>) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      plans: new FormControl('', [Validators.required]),
      coefficient: new FormControl('', [Validators.required, Validators.min(1), Validators.max(20), Validators.pattern('[0-9]{1,2}')]),
      course: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])

    });
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
    this.weeks[num] = parseInt(event.currentTarget.value, 10);
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
  }
}
