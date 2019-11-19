import {Component, OnInit} from '@angular/core';
import {Subject} from '../../model/subject.model';
import {StudyPlan} from '../../model/study-plan.model';
import {TimetableService} from '../../services/timetable.service';
import {EditableModeService} from '../../services/editable-mode.service';
import {CreateStudyPlanComponent} from '../dialogs/create-study-plan/create-study-plan.component';
import {MatDialog, MatRow, MatTable, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  selectedPlan: StudyPlan;


  plans: StudyPlan[];
  num: number;
  num1: number;
  semsLost: number;
  semsEven: number;
  cources: number;
  editMode = false;
  editPlan: StudyPlan;
  displayedColumnsStudyPlans: string[] = ['name'];
  subject: Subject;


  constructor(private timetableService: TimetableService, private editableModeService: EditableModeService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.timetableService.getPlans().subscribe(plans => {
      this.plans = plans;
      this.initializeData();
    });

  }

  private initializeData(): void {
    this.selectedPlan = this.plans[0];
    this.editPlan = JSON.parse(JSON.stringify(this.selectedPlan));
    this.semsEven = this.selectedPlan.countOfSem;
    if (this.selectedPlan.countOfSem % 2 !== 0) {
      this.semsEven = this.selectedPlan.countOfSem + 1;
    }
    this.semsLost = this.semsEven - this.selectedPlan.countOfSem;
    this.cources = this.semsEven / 2;
    this.num = this.cources * 2 + 4;
    this.num1 = this.cources * 2;
  }

  onSelect(plan: StudyPlan): void {
    this.selectedPlan = plan;

    this.editPlan = JSON.parse(JSON.stringify(this.selectedPlan));
    this.semsEven = this.selectedPlan.countOfSem;
    if (this.selectedPlan.countOfSem % 2 !== 0) {
      this.semsEven = this.selectedPlan.countOfSem + 1;
    }
    this.semsLost = this.semsEven - this.selectedPlan.countOfSem;
    this.cources = this.semsEven / 2;
    this.num = this.cources * 2 + 4;
    this.num1 = this.cources * 2;
  }


  public add(): void {
    this.selectedPlan = JSON.parse(JSON.stringify(this.editPlan));
    // this.editableModeService.editPlan(this.editPlan).subscribe((plan) => {
    // });
  }

  public changeNumber(event, id): void {
    this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    }).numberOfDiscipline = event.currentTarget.value;
    console.log(this.selectedPlan);
    console.log(this.editPlan);
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
    console.log(id);
    this.subject = this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    });
    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek;
    this.subject.semesters[numberOfSem].hoursPerWeek = parseInt(event.currentTarget.value, 10);
    this.subject.semesters[numberOfSem].creditUnits = parseInt(event.currentTarget.value, 10) / this.selectedPlan.coefficient;
    this.subject.freeHours = this.subject.freeHours - parseInt(event.currentTarget.value, 10);

  }

  public changeCreditUnit(event, id, numberOfSem): void {
    this.subject = this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    });

    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek;
    this.subject.semesters[numberOfSem].hoursPerWeek = parseInt(event.currentTarget.value, 10) * this.selectedPlan.coefficient;
    this.subject.semesters[numberOfSem].creditUnits = parseInt(event.currentTarget.value, 10);
    this.subject.freeHours = this.subject.freeHours - parseInt(event.currentTarget.value, 10) * this.selectedPlan.coefficient;
  }

  public editModeChange(): void {
    if (this.editMode === true) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  public editModeOn() {
    this.editMode = true;

  }

  public editModeOff() {
    this.editMode = false;
  }

  public updateStudyPlan() {
    // this.dialog.open(CreateStudyPlanComponent, {
    //   // width: '700px',
    //   // height: '700px',
    //   // data: null,
    //   // scrollStrategy: this.overlay.scrollStrategies.noop()
    // });

    const dialogRef = this.dialog.open(CreateStudyPlanComponent);

   /* dialogRef.afterClosed().subscribe(result => {
      this.studyPlans.push(result);
      console.log(result);
      console.log(this.studyPlans);
      this.studyPlansTable.renderRows();
      this.table.renderRows();
    });*/
  }
}
