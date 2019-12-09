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

const STUDY_PLANS_MOCK: StudyPlan[] = [
  {
    id: 1,
    name: 'Учебный план 1',
    isChanged: false,
    subjects: [{
      id: 1,
      name: 'Графика',
      semesters: [],
      department: '',
      sumOfHours: 0,
      freeHours: 0,
      numberOfDiscipline: '',
      isChanged: false,
      position: 1
    },
      {
        id: 2,
        name: 'Базы Данных (курс 1)',
        semesters: [],
        department: '',
        sumOfHours: 0,
        freeHours: 0,
        numberOfDiscipline: '',
        isChanged: false,
        position: 2
      },
      {
        id: 3,
        name: 'ООП',
        semesters: [],
        department: '',
        sumOfHours: 0,
        freeHours: 0,
        numberOfDiscipline: '',
        isChanged: false,
        position: 3
      },
      {
        id: 4,
        name: 'Python',
        semesters: [],
        department: '',
        sumOfHours: 0,
        freeHours: 0,
        numberOfDiscipline: '',
        isChanged: false,
        position: 4
      }],
    countOfSem: 0, coefficient: 0, weeks: []
  },
  {
    id: 2,
    name: 'Учебный план 2',
    isChanged: false,
    subjects: [{
      id: 4,
      name: 'Python',
      semesters: [],
      department: '',
      sumOfHours: 0,
      freeHours: 0,
      numberOfDiscipline: '',
      isChanged: false,
      position: 1
    },
      {
        id: 5,
        name: 'Физика (курс 2)',
        semesters: [],
        department: '',
        sumOfHours: 0,
        freeHours: 0,
        numberOfDiscipline: '',
        isChanged: false,
        position: 2
      },
      {
        id: 6,
        name: 'Java',
        semesters: [],
        department: '',
        sumOfHours: 0,
        freeHours: 0,
        numberOfDiscipline: '',
        isChanged: false,
        position: 3
      }],
    countOfSem: 0, coefficient: 0, weeks: []
  },
  {
    id: 3,
    name: 'Учебный план 3',
    isChanged: false,
    subjects: [{
      id: 7,
      name: 'Математика',
      semesters: [],
      department: '',
      sumOfHours: 0,
      freeHours: 0,
      numberOfDiscipline: '',
      isChanged: false,
      position: 1
    },
      {
        id: 8,
        name: 'Алгоритмы',
        semesters: [],
        department: '',
        sumOfHours: 0,
        freeHours: 0,
        numberOfDiscipline: '',
        isChanged: false,
        position: 2
      }],
    countOfSem: 0,
    coefficient: 0,
    weeks: []
  },
];

const SUBJECTS_MOCK: Subject[] = [
  {
    id: 1,
    name: 'Графика',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 2,
    name: 'Базы Данных (курс 1)',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 3,
    name: 'ООП',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 4,
    name: 'Python',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 5,
    name: 'Физика (курс 2)',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 6,
    name: 'Java',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 7,
    name: 'Математика',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  },
  {
    id: 8,
    name: 'Алгоритмы',
    semesters: [],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  }
];

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
              private overlay: Overlay) {
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
  displayedColumnsForSubjects: string[] = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
    'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];


  ngOnInit() {
    // Getting from backend
    // this.subjectService.getSubjects().subscribe(success => {
    //   this.subjects = success;
    //   console.log(success);
    // });

    // MOCK
    // this.subjects = STUDY_PLANS_MOCK[0].subjects;
    // this.editModeOff();
    // this.selectedStudyPlan = STUDY_PLANS_MOCK[0];
    // this.sortSubjectsForStudyPlan(STUDY_PLANS_MOCK[0]);
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
    this.displayedColumnsForSubjects = ['swap', 'name', 'exams', 'offset', 'rgr', 'control-tasks',
      'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];
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
    this.displayedColumnsForSubjects = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
      'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];
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
      width: '30%',
      height: '25%',
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
    const textMessage = 'Изменить имя учебного плана';
    const currentStudyPlanName = this.selectedStudyPlan.name;

    const dialogRef = this.dialog.open(CreateStudyPlanComponent, {
      width: '30%',
      height: '25%',
      data: {message: textMessage, currentName: currentStudyPlanName},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    dialogRef.afterClosed().subscribe(newName => {
      newName = newName as string;
      if (newName != null) {
        console.log(newName);
        for (let i = 0; i < this.studyPlans.length; i++) {
          if (this.studyPlans[i].name === this.selectedStudyPlan.name) {
            this.studyPlans[i].name = newName;
            this.selectedStudyPlan.name = newName;
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



}
