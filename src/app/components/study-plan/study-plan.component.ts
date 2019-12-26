import {Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {SubjectService} from '../../services/subject.service';
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
import {SeverityService} from '../../services/severity.service';
import {Severity} from '../../model/severity.model';
import {SEVERITY_LIST} from '../../mock/severity-mock';
import {EditSubjectComponent} from '../dialogs/edit-subject/edit-subject.component';

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
              private severityService: SeverityService) {
  }

  // TODO refactor below one
  @ViewChild('table', {static: false}) table: MatTable<Subject>;
  @ViewChildren('table') tables: QueryList<MatTable<Subject>>;
  @ViewChild('tableMain', {static: false}) studyPlansTable: MatTable<Subject>;
  @ViewChild('tablePrototypes', {static: false}) subjectPrototypesTable: MatTable<Subject>;


  public subjects: Subject[];
  public studyPlans = STUDY_PLANS_MOCK;
  public selectedStudyPlan: StudyPlan = null;
  public isStudyPlanSelected = false;
  public allSubjects: Subject[] = SUBJECTS_MOCK;
  public editMode = false;
  public propertyChanged = false;
  public studyPlannedBeforeChanges;
  public expandedStudyPlan: StudyPlan | null;
  public newStudyPlan: StudyPlan;
  public studyPlanBackup: StudyPlan;

  displayedColumnsStudyPlans: string[] = ['name'];
  displayedColumnsSubjects: string[] = ['prototypes', 'add-icon'];
  // displayedColumnsSingleStudyPlan: string[] = ['study-plan','swap', 'name', 'exams', 'offset', 'rgr', 'control-tasks',
  //   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];
  displayedColumnsSingleStudyPlan: string[] = ['study-plan'];
  displayedColumnsForSubjects: string[] = [];
  severityList: Severity[] = [];
  // displayedColumnsForSubjects: string[] = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
  //   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];


  ngOnInit() {
    // SEVERITY_LIST.forEach(res => this.displayedColumnsForSubjects.push(res.name));
    console.log('push done');
    this.severityService.getSeverities().subscribe(result => {
        this.displayedColumnsForSubjects = [];
        this.severityList = result;
        // this.displayedColumnsForSubjects.push('name');
        this.severityList.forEach(res => this.displayedColumnsForSubjects.push(res.name));
        console.log('1111111111111push done--------------------------------------------');
        console.log(result);
        console.log('1111111111111push done--------------------------------------------');
        // const index = this.getIndex(this.selectedStudyPlan);
        // this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
        // this.tables.toArray()[index].renderRows();
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
    this.selectedStudyPlan.subjects.push(subject);
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
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
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
    // this.sortSubjectsForStudyPlan(this.selectedStudyPlan);
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
          this.selectedStudyPlan.subjects[i] = temp;
          break;
        } else {
          temp = this.selectedStudyPlan.subjects[i - 1];
          this.selectedStudyPlan.subjects[i - 1] = this.selectedStudyPlan.subjects[i];
          this.selectedStudyPlan.subjects[i] = temp;
          break;
        }
      }
    }
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
    // this.table.dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    // this.studyPlansTable.renderRows();
    // this.table.renderRows();
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
          this.selectedStudyPlan.subjects[i] = temp;
          break;
        } else {
          temp = this.selectedStudyPlan.subjects[i + 1];
          this.selectedStudyPlan.subjects[i + 1] = this.selectedStudyPlan.subjects[i];
          this.selectedStudyPlan.subjects[i] = temp;
          break;
        }

      }
    }
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
    // this.table.dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    // this.studyPlansTable.renderRows();
    // this.table.renderRows();
  }

  public editModeOn() {
    const index = this.getIndex(this.selectedStudyPlan);
    this.editMode = true;
    // this.displayedColumnsForSubjects = ['swap', 'name', 'exams', 'offset', 'rgr', 'control-tasks',
    //   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];
    this.studyPlanBackup = JSON.parse(JSON.stringify(this.selectedStudyPlan));
    // this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
  }

  public editModeOff() {
    // let index = null;
    // if (this.selectedStudyPlan != null) {
    //   index = this.getIndex(this.selectedStudyPlan);
    // }
    // if (index != null) {
    //   this.tables.toArray()[index].dataSource = new MatTableDataSource(this.studyPlanBackup.subjects);
    //   this.tables.toArray()[index].renderRows();
    // }
    this.editMode = false;
    // this.displayedColumnsForSubjects = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
    //   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];
    this.studyPlanBackup = null;
    // this.studyPlansTable.renderRows();
    // this.table.renderRows();
    // this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);

  }

  public changeProperty(subject: Subject) {
    console.log('changeddddd');
    subject.isChanged = true;
  }

  public expandRow(studyPlan: StudyPlan) {
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
    // this.editModeOff();
    // this.declineChanges();
    console.log(this.selectedStudyPlan);
    // this.isStudyPlanSelected = !this.isStudyPlanSelected;
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
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
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

  public getColumsToDisplay() {
    // 'swap', 'name', 'exams', 'offset', 'rgr', 'control-tasks',
    //   //   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];
    let finalColumsToDisplay: string[] = [];
    if (this.editMode) {
      finalColumsToDisplay.push('swap');
      finalColumsToDisplay.push('name');

      this.displayedColumnsForSubjects.forEach(res => finalColumsToDisplay.push(res));
      finalColumsToDisplay.push('edit-icon');
      finalColumsToDisplay.push('delete-icon');
    } else {
      // finalColumsToDisplay.push('swap');
      finalColumsToDisplay.push('name');
      this.displayedColumnsForSubjects.forEach(res => finalColumsToDisplay.push(res));
    }

    return finalColumsToDisplay;
  }

  public getValueToDisplay(subject: Subject, name: string) {
    for (let i = 0; i < subject.severities.length; i++) {
      if (subject.severities[i].severity.name === name) {
        return subject.severities[i].hours;
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
}
