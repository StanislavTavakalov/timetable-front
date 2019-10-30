import {Component, OnInit} from '@angular/core';
import {Subject} from '../../model/subject.model';
import {StudyPlan} from '../../model/study-plan.model';
import {TimetableService} from '../../services/timetable.service';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  selectedPlan: StudyPlan;
  selectedDisciplines: Subject[];
  plans: StudyPlan[];
  num: number;
  num1:number;
  semsLost: number;
  semsEven: number;
  cources: number;

  constructor(private timetableService: TimetableService) {
  }

  ngOnInit() {
    this.timetableService.getPlans().subscribe(plans => {
      this.plans = plans;
      this.initializeData();
    });

  }

  private initializeData(): void {
    this.selectedPlan = this.plans[0];
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

}
