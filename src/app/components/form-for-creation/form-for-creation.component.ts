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
  formGroupHours:any;

  constructor(private formForCreationServiceService: FormForCreationServiceService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'coefficient': new FormControl("", [Validators.required]),
      'course': new FormControl("", [Validators.required])

    });
    this.countOfSem = 0;
  }


  public add(): void {
    if (this.formGroup.valid && this.formGroupHours.valid) {

    this.plan.name = this.name;
    this.plan.countOfSem = this.countOfSem;
    this.plan.weeks = this.weeks;
    this.plan.coefficient = this.coefficient;
    this.formForCreationServiceService.addPlan(this.plan).subscribe(() => {
      window.alert('Учебный план успешно создан');
    });
  } else{
      window.alert('Заполните обязательные поля');
    }
  }

  public valuesf(num, event): void {
    if (num === 0) {
      this.countOfSem = parseInt(event.value, 10);
      this.formGroupHours = new FormGroup({});
      for(var i=0;i<this.countOfSem;i++)
      {
        this.formGroupHours.addControl('hours'+i,new FormControl('', Validators.required));
      }
    } else if (num === 2) {
      this.coefficient = parseInt(event.value, 10);
    } else {
      this.name = event.currentTarget.value;
    }

  }

  public changeWeeks(num, event) {
    this.weeks[num] = parseInt(event.value, 10);
  }
}
