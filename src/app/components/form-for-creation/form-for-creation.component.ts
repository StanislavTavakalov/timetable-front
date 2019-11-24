import {Component, OnInit} from '@angular/core';
import {FormForCreationServiceService} from '../../services/form-for-creation-service.service';
import {StudyPlan} from '../../model/study-plan.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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


  constructor(private formForCreationServiceService: FormForCreationServiceService) {
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
      this.plan.countOfSem = this.countOfSem;
      this.plan.weeks = this.weeks;
      this.plan.coefficient = this.coefficient;
      this.formForCreationServiceService.editPlan(this.plan);
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
        this.formGroupHours.addControl('hours' + i, new FormControl('', [Validators.required, Validators.min(1),Validators.max(20), Validators.pattern('[0-9]{1,2}')]));
      }
    } else if (num === 2) {
      this.coefficient = parseInt(event.value, 10);
    } else {
      this.formForCreationServiceService.getPlanById(parseInt(event.value, 10)).subscribe(plan => this.plan = plan);
    }

  }

  public changeWeeks(num, event) {
    this.weeks[num] = parseInt(event.value, 10);
  }
}
