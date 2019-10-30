import {Component, OnInit} from '@angular/core';
import {Subject} from '../../model/subject.model';
import {StudyPlan} from '../../model/study-plan.model';
import {EditableModeService} from '../../services/editable-mode.service';


@Component({
  selector: 'app-editable-mode',
  templateUrl: './editable-mode.component.html',
  styleUrls: ['./editable-mode.component.css']
})
export class EditableModeComponent implements OnInit {

  selectedPlan: StudyPlan;
  editPlan: StudyPlan;
  selectedDisciplines: Subject[];
  plans: StudyPlan[];

  maxSem: number;
  maxCource: number;
  courcesNo: number[] = [];
  semsLost: number;
  semsEven: number;
  cources: number;
  subject: Subject;

  num: number;
  num1:number;


  constructor(private editableModeService: EditableModeService) {
  }

  ngOnInit() {
    this.editableModeService.getPlans().subscribe(plans => {
      this.plans = plans;
      this.initializeData();
    });

  }

  private initializeData(): void {
    this.selectedPlan = this.plans[0];
    this.editPlan = this.selectedPlan;
    this.selectedDisciplines = this.plans[0].subjects;
    this.semsEven = this.selectedPlan.countOfSem;
    if (this.selectedPlan.countOfSem % 2 !== 0) {
      this.semsEven = this.selectedPlan.countOfSem + 1;
    }
    this.semsLost = this.semsEven - this.selectedPlan.countOfSem;
    this.cources = this.semsEven / 2;
    this.num=this.cources*2+4;
    this.num1=this.cources*2;

  }

  onSelect(plan: StudyPlan): void {
    this.selectedPlan = plan;
    this.selectedDisciplines = plan.subjects;
    this.semsEven = this.selectedPlan.countOfSem;
    if (this.selectedPlan.countOfSem % 2 !== 0) {
      this.semsEven = this.selectedPlan.countOfSem + 1;
    }
    this.semsLost = this.semsEven - this.selectedPlan.countOfSem;
    this.cources = this.semsEven / 2;
    this.num=this.cources*2+4;
    this.num1=this.cources*2;
  }

  public add(): void {
    this.editableModeService.editPlan(this.editPlan).subscribe((plan) => {
    });
  }

  public changeNumber(event, id): void {
    this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    }).numberOfDiscipline = event.currentTarget.value;
  }

  public changeName(event, id): void {
    this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    }).name = event.currentTarget.value;
  }

  public changeDepartment(event, id): void {
    this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    }).department = event.currentTarget.value;
  }

  public changeHoursPerWeek(event, id, numberOfSem): void {
    this.subject = this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    });
    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek;
    this.subject.semesters[numberOfSem].hoursPerWeek = parseInt(event.currentTarget.value,10);
    this.subject.semesters[numberOfSem].creditUnits = parseInt(event.currentTarget.value,10) / this.selectedPlan.coefficient;
    this.subject.freeHours = this.subject.freeHours - parseInt(event.currentTarget.value, 10);

  }

  public changeCreditUnit(event, id, numberOfSem): void {
    this.subject = this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    });
    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek;
    this.subject.semesters[numberOfSem].hoursPerWeek= parseInt(event.currentTarget.value,10) * this.selectedPlan.coefficient;
    this.subject.semesters[numberOfSem].creditUnits = parseInt(event.currentTarget.value,10);
    this.subject.freeHours = this.subject.freeHours - parseInt(event.currentTarget.value, 10) * this.selectedPlan.coefficient;
  }

}
