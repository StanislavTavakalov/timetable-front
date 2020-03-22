import {Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {SubjectService} from '../../services/lectern/subject.service';
import {MatDialog, MatTable, MatTableDataSource} from '@angular/material';
import {StudyPlan} from '../../model/study-plan.model';
import {Subject} from '../../model/subject.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Overlay} from '@angular/cdk/overlay';
import {CreateStudyPlanComponent} from '../dialogs/create-study-plan/create-study-plan.component';
import {ConfirmationComponent} from '../dialogs/confirmation/confirmation.component';
import {SUBJECTS} from '../../mock/study-mock';
import {STUDY_PLANS_MOCK, SUBJECTS_MOCK} from '../../mock/plan-mock';
import {StudyPlanDetailsComponent} from '../dialogs/study-plan-details/study-plan-details.component';
import {SeverityService} from '../../services/lectern/severity.service';
import {Severity} from '../../model/severity.model';
import {EditSubjectComponent} from '../dialogs/edit-subject/edit-subject.component';
import {PereodicSeverityService} from '../../services/lectern/pereodic-severity.service';
import {TimetableService} from '../../services/timetable.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {StudyPlanService} from '../../services/lectern/study-plan.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudyPlanComponent implements OnInit, AfterViewInit {


  constructor(private subjectService: SubjectService,
              private dialog: MatDialog,
              private overlay: Overlay,
              private severityService: SeverityService,
              private severityPereodicService: PereodicSeverityService,
              private timetableService: TimetableService,
              private studyPlanService: StudyPlanService,
              private localStorageService: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  // TODO refactor below one
  @ViewChild('table', {static: false}) table: MatTable<Subject>;
  @ViewChildren('table') tables: QueryList<MatTable<Subject>>;
  @ViewChild('tableMain', {static: false}) studyPlansTable: MatTable<Subject>;
  @ViewChild('tablePrototypes', {static: false}) subjectPrototypesTable: MatTable<Subject>;


  public subjects: Subject[];
  public studyPlans = STUDY_PLANS_MOCK;
  public selectedStudyPlan: StudyPlan = null;
  public allSubjects: Subject[] = SUBJECTS_MOCK;
  public editMode = false;
  public expandedStudyPlan: StudyPlan | null;
  public studyPlanBackup: StudyPlan;

  displayedColumnsStudyPlans: string[] = ['name'];
  displayedColumnsSubjects: string[] = ['prototypes', 'add-icon'];
  displayedColumnsSingleStudyPlan: string[] = ['study-plan'];
  displayedSeverityColumnsForSubjects: string[] = [];
  displayedPereodicSeverityColumnsForSubjects: string[] = [];
  severityList: Severity[] = [];
  pereodicSeverityList: PereodicSeverity[] = [];

  ngOnInit() {
    // SEVERITY_LIST.forEach(res => this.displayedColumnsForSubjects.push(res.name));

    // const id = this.route.snapshot.paramMap.get('id');
    // const token = this.route.snapshot.queryParamMap.get('token');
    // console.log(id);
    // console.log(token);
    this.studyPlanService.getAuthToken().subscribe((result: any) => {
      console.log(result);
      this.localStorageService.setCurrentUserToken(result.tokenType + ' ' + result.accessToken);
    });
    this.studyPlanService.getAllStudyPlans().subscribe(result => console.log(result));


    this.timetableService.getPlans();
    this.severityPereodicService.getPereodicSeverities().subscribe(pereodicSeverities => {
        this.displayedSeverityColumnsForSubjects = [];
        this.pereodicSeverityList = pereodicSeverities;
        this.pereodicSeverityList.forEach(res => this.displayedPereodicSeverityColumnsForSubjects.push(res.name));
      }
    );

    this.severityService.getSeverities().subscribe(result => {
        this.displayedSeverityColumnsForSubjects = [];
        this.severityList = result;
        this.severityList.forEach(res => this.displayedSeverityColumnsForSubjects.push(res.name));
      }
    );
  }

  ngAfterViewInit() {
    this.editModeOff();
  }

  public selectStudyPlan(studyPlan: StudyPlan) {
    this.selectedStudyPlan = studyPlan;
    this.sortSubjectsForStudyPlan(studyPlan);
  }

  public sortSubjectsForStudyPlan(studyPlan: StudyPlan) {
    // this.allSubjects = SUBJECTS_MOCK.filter(val => !studyPlan.subjects.some(value => value.name === val.name));
    this.allSubjects = SUBJECTS_MOCK;
  }

  public addSubjectToStudyPlan(subject: Subject) {
    const addedSubject = JSON.parse(JSON.stringify(subject));
    addedSubject.id = null;
    addedSubject.isChanged = true;

    this.selectedStudyPlan.subjects.push(addedSubject);
    this.renderCurrentStudyPlan();
  }

  public getIndex(studyPlan: StudyPlan) {
    if (studyPlan === undefined) {
      return 0;
    }
    console.log('after get');

    let i = -1;
    for (const studyPlanOb of this.studyPlans) {
      i++;
      if (studyPlan === null) {
        break;
      }
      if (studyPlanOb.id === studyPlan.id) {
        return i;
      }
    }
  }

  public deleteSubjectFromStudyPlan(subject: Subject) {
    for (let i = 0; i < this.selectedStudyPlan.subjects.length; ++i) {
      if (this.selectedStudyPlan.subjects[i].id === subject.id) {
        this.selectedStudyPlan.subjects.splice(i, 1);
        break;
      }
    }
    this.renderCurrentStudyPlan();
  }

  public swapWithUpper(subject: Subject) {
    const subjectCount = this.selectedStudyPlan.subjects.length;
    if (subjectCount === 1) {
      return;
    }
    for (let i = 0; i < subjectCount; ++i) {
      if (this.selectedStudyPlan.subjects[i].name === subject.name) {
        let temp;
        if (i === 0) {
          temp = this.selectedStudyPlan.subjects[this.selectedStudyPlan.subjects.length - 1];

          this.selectedStudyPlan.subjects[subjectCount - 1] = this.selectedStudyPlan.subjects[i];
          this.selectedStudyPlan.subjects[subjectCount - 1].isChanged = true;

          this.selectedStudyPlan.subjects[i] = temp;
          this.selectedStudyPlan.subjects[i].isChanged = true;

          break;
        } else {
          temp = this.selectedStudyPlan.subjects[i - 1];

          this.selectedStudyPlan.subjects[i - 1] = this.selectedStudyPlan.subjects[i];
          this.selectedStudyPlan.subjects[i - 1].isChanged = true;

          this.selectedStudyPlan.subjects[i] = temp;
          this.selectedStudyPlan.subjects[i].isChanged = true;
          break;
        }
      }
    }
    this.renderCurrentStudyPlan();
  }

  public swapWithLower(subject: Subject) {
    const subjectCount = this.selectedStudyPlan.subjects.length;
    if (subjectCount === 1) {
      return;
    }
    for (let i = 0; i < subjectCount; ++i) {
      if (this.selectedStudyPlan.subjects[i].name === subject.name) {
        let temp;
        if (i === subjectCount - 1) {
          temp = this.selectedStudyPlan.subjects[0];
          this.selectedStudyPlan.subjects[0] = this.selectedStudyPlan.subjects[i];
          this.selectedStudyPlan.subjects[0].isChanged = true;

          this.selectedStudyPlan.subjects[i] = temp;
          this.selectedStudyPlan.subjects[i].isChanged = true;
          break;
        } else {
          temp = this.selectedStudyPlan.subjects[i + 1];
          this.selectedStudyPlan.subjects[i + 1] = this.selectedStudyPlan.subjects[i];
          this.selectedStudyPlan.subjects[i + 1].isChanged = true;

          this.selectedStudyPlan.subjects[i] = temp;
          this.selectedStudyPlan.subjects[i].isChanged = true;
          break;
        }

      }
    }
    this.renderCurrentStudyPlan();
  }

  public editModeOn() {
    const index = this.getIndex(this.selectedStudyPlan);
    this.editMode = true;
    this.studyPlanBackup = JSON.parse(JSON.stringify(this.selectedStudyPlan));
    this.tables.toArray()[index].renderRows();
  }

  public editModeOff() {
    this.editMode = false;
    this.studyPlanBackup = null;
  }

  public changeProperty(subject: Subject) {
    subject.isChanged = true;
  }

  public expandRow(studyPlan: StudyPlan) {
    // const isSaveChangesNeeded = this.isSaveChangesNeededOnChangeStudyPlan();
    this.expandedStudyPlan = this.expandedStudyPlan === studyPlan ? null : studyPlan;
    if (this.selectedStudyPlan === studyPlan) {
      if (this.editMode) {
        this.declineChanges();
      }
      this.selectedStudyPlan = null;
    } else {
      if (this.editMode) {
        this.declineChanges();
      }
      this.selectedStudyPlan = studyPlan;
      this.renderTable(this.selectedStudyPlan);
    }
    console.log(this.selectedStudyPlan);
  }

  public isSaveChangesNeededOnChangeStudyPlan() {
    // let loading = true;
    // let flag;
    // if (this.editMode) {
    //   const textMessage = 'Сохранить изменения';
    //   const dialogRef = this.dialog.open(ConfirmationComponent, {
    //     width: '23%',
    //     height: '22%',
    //     data: {message: textMessage}
    //   });
    //
    //   dialogRef.afterClosed().subscribe(result => {
    //     flag = result;
    //     loading = false;
    //   });
    //
    //   // while (loading) {
    //   //   // waiting until dialog will be closed
    //   // }
    //   return flag;
    // } else {
    //   return false;
    // }
  }


  public createNewStudyPlan() {
    const dialogRef = this.dialog.open(CreateStudyPlanComponent, {
      width: '35%',
      height: '45%',
      data: {message: 'Создать новый учебный план'},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.studyPlans.push(result);
        console.log(result);
        console.log(this.studyPlans);
        this.studyPlansTable.renderRows();
        this.table.renderRows();
      }
    });
  }

  public deleteStudyPlan() {
    const textMessage = 'Удалить учебный план';
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '23%',
      height: '22%',
      data: {message: textMessage}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('delete');
        for (let i = 0; i < this.studyPlans.length; i++) {
          if (this.studyPlans[i].id === this.selectedStudyPlan.id) {
            this.studyPlans.splice(i, 1);
            console.log('done');
            console.log(this.studyPlans);
            break;
          }
        }
        this.studyPlansTable.renderRows();
        this.selectedStudyPlan = null;
      } else {
        console.log('cancel');
      }
    });
  }

  public changeStudyPlanName() {
    const textMessage = 'Изменить имя учебный план';
    const currentStudyPlan = this.selectedStudyPlan;

    console.log('BEFORE DIALOG OPEM: ' + currentStudyPlan);
    const dialogRef = this.dialog.open(CreateStudyPlanComponent, {
      width: '30%',
      height: '45%',
      data: {message: textMessage, currentStudyPlan},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(newStudyPlan => {
      newStudyPlan = newStudyPlan as StudyPlan;
      if (newStudyPlan != null) {
        console.log(newStudyPlan);
        for (let i = 0; i < this.studyPlans.length; i++) {
          if (this.studyPlans[i].id === this.selectedStudyPlan.id) {
            this.studyPlans[i] = newStudyPlan;
            this.selectedStudyPlan = newStudyPlan;
          }
        }
        this.studyPlansTable.renderRows();
        // this.table.renderRows();
      }
    });
  }

  public applyChanges() {
    this.editModeOff();

    // Setting isChanged to false for all subjects and study plan
    for (const studyPlan of this.studyPlans) {
      if (studyPlan.id === this.selectedStudyPlan.id) {
        studyPlan.isChanged = false;
        for (const subject of studyPlan.subjects) {
          subject.isChanged = false;
        }
        this.selectedStudyPlan = studyPlan;
      }
    }

    this.renderCurrentStudyPlan();

    // TODO: send http PUT and POST requests to backend
  }

  public declineChanges() {
    for (let i = 0; i < this.studyPlans.length; i++) {
      if (this.studyPlans[i].id === this.selectedStudyPlan.id) {
        this.studyPlans[i] = JSON.parse(JSON.stringify(this.studyPlanBackup));
        this.selectedStudyPlan = this.studyPlans[i];
        break;
      }
    }
    this.editModeOff();
    this.renderCurrentStudyPlan();
    //  this.studyPlansTable.renderRows();
    // this.renderTable(this.selectedStudyPlan);
  }

  private renderTable(studyPlan: StudyPlan) {
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].renderRows();
    this.studyPlansTable.renderRows();
  }

  public showPrototypes() {
    this.subjectPrototypesTable.dataSource = SUBJECTS;
  }

  public showExamples() {
    this.subjectPrototypesTable.dataSource = SUBJECTS_MOCK;
  }

  public showDetails() {

    const currentStudyPlan = this.selectedStudyPlan;
    const textMessage = 'Удалить учебный план';
    const dialogRef = this.dialog.open(StudyPlanDetailsComponent, {
      width: '30%',
      height: '36%',
      data: {message: textMessage, currentStudyPlan}
    });
    dialogRef.afterClosed().subscribe();
  }

  public getColumnsToDisplay() {
    const finalColumnsToDisplay: string[] = [];
    if (this.editMode) {
      finalColumnsToDisplay.push('swap');
      finalColumnsToDisplay.push('name');
      this.displayedPereodicSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      this.displayedSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      finalColumnsToDisplay.push('auditLessons');
      finalColumnsToDisplay.push('edit-icon');
      finalColumnsToDisplay.push('delete-icon');
    } else {
      finalColumnsToDisplay.push('name');
      this.displayedPereodicSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      this.displayedSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      finalColumnsToDisplay.push('auditLessons');
    }

    return finalColumnsToDisplay;
  }

  public getValueToDisplay(subject: Subject, name: string) {
    for (let i = 0; i < subject.severities.length; i++) {
      if (subject.severities[i].severity.name === name) {
        return subject.severities[i].hours;
      }
    }
    return 0;
  }

  public getValueToDisplayPereodic(subject: Subject, name: string) {
    for (let i = 0; i < subject.pereodicSeverities.length; i++) {
      if (subject.pereodicSeverities[i].severity.name === name) {
        let result = '';
        for (const semNumber of subject.pereodicSeverities[i].semesterNumbers) {
          result += semNumber.number;
        }
        return result;
      }
    }
    return 0;
  }


  public editSubjectFromStudyPlan(subject: Subject) {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      width: '30%',
      height: '45%',
      data: {subject},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    // dialogRef.afterClosed().subscribe(newSubject => {
    //
    // });
  }

  public getAuditLessonsHours(subject: Subject) {

    let sumOfHours = 0;
    for (const sev of subject.severities) {
      sumOfHours += sev.hours as number;
    }
    return sumOfHours;
  }

  public renderCurrentStudyPlan() {
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
  }
}
