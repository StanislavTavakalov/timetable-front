import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from '../../model/subject.model';
import {StudyPlan} from '../../model/study-plan.model';
import {TimetableService} from '../../services/timetable.service';
import {EditableModeService} from '../../services/editable-mode.service';
import {MatDialog, MatTable} from '@angular/material';
import {FormForCreationComponent} from '../form-for-creation/form-for-creation.component';
import {Overlay} from '@angular/cdk/overlay';
import {ActivatedRoute} from '@angular/router';
import {Lectern} from '../../model/lectern.model';
import {NotifierService} from 'angular-notifier';


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
  updatedPlan: StudyPlan;
  lecternId: string;
  lectern: Lectern;

  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;


  constructor(private route: ActivatedRoute,
              private timetableService: TimetableService,
              private editableModeService: EditableModeService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.lecternId = this.route.snapshot.paramMap.get('id');
    if (this.lecternId != null) {
      this.timetableService.getPlansByLecternId(this.lecternId).subscribe(plans => {
        plans.forEach((plan) => {
          plan.subjects.forEach((subject) => {
            subject.semesters.sort((a, b) => a.number - b.number);
          });
        });
        plans.forEach((plan) => {
          plan.weeks.sort((a, b) => a.position - b.position);
        });
        this.plans = plans;
        this.selectedPlan = this.plans[0];
        this.initializeData();
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить учебные планы');
      });
      this.timetableService.getLecternById(this.lecternId).subscribe(lectern => {
        this.lectern = lectern;
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить учебные кафедру');
      });
    }
  }

  private initializeData(): void {
    if (this.selectedPlan != null) {
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
    this.timetableService.editPlan(this.selectedPlan).subscribe();
  }

  public exitEditableMode(): void {
    if (this.selectedPlan != null) {
      this.editPlan = JSON.parse(JSON.stringify(this.selectedPlan));
      this.editModeOff();
    }
  }

  public changeHoursPerWeek(event, id, numberOfSem): void {
    this.subject = this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    });
    if ((this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek * this.selectedPlan.weeks[numberOfSem].count - parseInt(event.currentTarget.value, 10) * this.selectedPlan.weeks[numberOfSem].count) < 0) {
      window.alert('Превышены свободные часы');
      event.currentTarget.style.background = 'red';
      return;
    }
    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek * this.selectedPlan.weeks[numberOfSem].count;
    this.subject.semesters[numberOfSem].hoursPerWeek = parseInt(event.currentTarget.value, 10);
    this.subject.semesters[numberOfSem].creditUnits = Math.round(parseInt(event.currentTarget.value, 10) / this.selectedPlan.coefficient);
    this.subject.freeHours = this.subject.freeHours - parseInt(event.currentTarget.value, 10) * this.selectedPlan.weeks[numberOfSem].count;
    if (event.currentTarget.style.background === 'red') {
      event.currentTarget.style.background = 'green';
    }
  }

  public changeCreditUnit(event, id, numberOfSem): void {
    this.subject = this.editPlan.subjects.find((discipline) => {
      return discipline.id === id;
    });
    if ((this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek - parseInt(event.currentTarget.value, 10) * this.selectedPlan.coefficient) < 0) {
      window.alert('Превышены свободные часы');
      event.currentTarget.style.background = 'red';
      return;
    }
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
    const dialogRef = this.dialog.open(FormForCreationComponent, {
      width: '25%',
      height: '60%',
      data: {lectern: this.lecternId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.timetableService.editPlan(result).subscribe(plan => {
          this.updatedPlan = plan;
          this.plans[this.plans.indexOf(this.selectedPlan)] = plan;
          this.reculculate();
          this.table.renderRows();
          this.notifierService.notify('success', 'Учебный план успешно обновлен');
        });
      }
    });
  }

  public reculculate() {
    this.table.renderRows();
    if (this.updatedPlan.id = this.selectedPlan.id) {
      this.selectedPlan = JSON.parse(JSON.stringify(this.updatedPlan));
      this.editPlan = JSON.parse(JSON.stringify(this.updatedPlan));
      this.semsEven = this.selectedPlan.countOfSem;
      if (this.selectedPlan.countOfSem % 2 !== 0) {
        this.semsEven = this.selectedPlan.countOfSem + 1;
      }
      this.semsLost = this.semsEven - this.selectedPlan.countOfSem;
      this.cources = this.semsEven / 2;
      this.num = this.cources * 2 + 4;
      this.num1 = this.cources * 2;
    }
  }
}
