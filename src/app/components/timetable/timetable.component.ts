import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from '../../model/subject.model';
import {StudyPlan} from '../../model/study-plan.model';
import {TimetableService} from '../../services/timetable.service';
import {MatDialog, MatTable} from '@angular/material';
import {FormForCreationComponent} from '../form-for-creation/form-for-creation.component';
import {Overlay} from '@angular/cdk/overlay';
import {ActivatedRoute} from '@angular/router';
import {Lectern} from '../../model/lectern.model';
import {NotifierService} from 'angular-notifier';
import {HeaderType} from '../../model/header-type';
import {LocalStorageService} from '../../services/local-storage.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {Role} from '../../model/role.model';


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
  selectedId: string;

  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;


  constructor(private route: ActivatedRoute,
              private timetableService: TimetableService,
              private dialog: MatDialog, private overlay: Overlay,
              private localStorageService: LocalStorageService,
              private lecternService: LecternService,
              private notifierService: NotifierService) {
  }

  ngOnInit() {
    this.lecternId = this.route.snapshot.paramMap.get('id');
    this.localStorageService.observableHeaderType.next(HeaderType.LECTERN);
    // loading of Lectern if it is null or id changed
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== this.lecternId) {
      this.lecternService.getLecternById(this.lecternId).subscribe(value => {
        this.lectern = value;
        this.localStorageService.observableLectern.next(this.lectern);
        console.log(this.lectern);
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить кафедру.');
      });
    }
    this.selectedId = this.route.snapshot.paramMap.get('sp_id');
    if (this.lecternId != null) {
      this.timetableService.getPlansByLecternId(this.lecternId).subscribe(plans => {
        plans.forEach((plan) => {
          plan.subjects.sort((a, b) => a.position - b.position);
        });
        plans.forEach((plan) => {
          plan.subjects.forEach((subject) => {
            subject.semesters.sort((a, b) => a.number - b.number);
          });
        });
        plans.forEach((plan) => {
          plan.weeks.sort((a, b) => a.position - b.position);
        });
        this.plans = plans;
        if (this.selectedId === null) {
          this.selectedPlan = this.plans[0];
        } else {
          this.selectedPlan = this.plans.find((plan) => {
            return plan.id === this.selectedId;
          });
        }
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
    this.editModeOff();
  }


  public add(): void {
    this.selectedPlan = JSON.parse(JSON.stringify(this.editPlan));
    this.timetableService.editPlan(this.selectedPlan).subscribe();
    this.notifierService.notify('success', 'Учебный план успешно измнен');
    this.editModeOff();
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
    if ((this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek *
        this.selectedPlan.weeks[numberOfSem].count - parseInt(event.currentTarget.value, 10) *
        this.selectedPlan.weeks[numberOfSem].count) < 0) {
      window.alert('Превышены свободные часы');
      event.currentTarget.style.background = 'red';
      return;
    }
    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek *
      this.selectedPlan.weeks[numberOfSem].count;
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
    if ((this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek *
         this.selectedPlan.weeks[numberOfSem].count - parseInt(event.currentTarget.value, 10) *
         this.selectedPlan.coefficient * this.selectedPlan.weeks[numberOfSem].count) < 0) {
      window.alert('Превышены свободные часы');
      event.currentTarget.style.background = 'red';
      return;
    }
    this.subject.freeHours = this.subject.freeHours + this.subject.semesters[numberOfSem].hoursPerWeek *
      this.selectedPlan.weeks[numberOfSem].count;
    this.subject.semesters[numberOfSem].hoursPerWeek = parseInt(event.currentTarget.value, 10) *
      this.selectedPlan.coefficient;
    this.subject.semesters[numberOfSem].creditUnits = parseInt(event.currentTarget.value, 10);
    this.subject.freeHours = this.subject.freeHours - this.subject.semesters[numberOfSem].hoursPerWeek *
      this.selectedPlan.weeks[numberOfSem].count;
    if (event.currentTarget.style.background === 'red') {
      event.currentTarget.style.background = 'green';
    }
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
    this.updatedPlan = this.selectedPlan;
    const dialogRef = this.dialog.open(FormForCreationComponent, {
      width: '25%',
      height: '60%',
      data: {studyplan: JSON.parse(JSON.stringify(this.updatedPlan))},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.timetableService.editPlan(result).subscribe(plan => {
          plan.subjects.sort((a, b) => a.position - b.position);
          plan.subjects.forEach((subject) => {
            subject.semesters.sort((a, b) => a.number - b.number);
          });
          plan.weeks.sort((a, b) => a.position - b.position);
          this.plans[this.plans.indexOf(this.updatedPlan)] = plan;
          this.updatedPlan = plan;
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

  isDeleteEditAddStudyPlanEnabled() {
    const userRoles = this.localStorageService.getCurrentUser().userRoles.map(userRole => userRole.role);
    return userRoles.includes(Role.ROLE_ADMIN) || userRoles.includes(Role.ROLE_LECTERN_METHODIST) || userRoles.includes(Role.ROLE_LECTERN);
  }
}
