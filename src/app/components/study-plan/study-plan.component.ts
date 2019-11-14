import {ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {SubjectService} from '../../services/subject.service';

import {Observable} from 'rxjs';
import {MatDialog, MatRow, MatTable, MatTableDataSource} from '@angular/material';
import {StudyPlan} from '../../model/study-plan.model';
import {Subject} from '../../model/subject.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Overlay} from '@angular/cdk/overlay';
import {CreateStudyPlanComponent} from '../dialogs/create-study-plan/create-study-plan.component';


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
              private overlay: Overlay,
              private cdr: ChangeDetectorRef) {
  }

  @ViewChild('table', {static: false}) table: MatTable<Subject>;
  @ViewChildren('table') tables: QueryList<MatTable<Subject>>;
  @ViewChild('tableMain', {static: false}) studyPlansTable: MatTable<Subject>;
  //   // @ViewChild('tableMain', {static: false}) tableM: MatTable<StudyPlan>;
  // @ts-ignore
  // @ViewChild('table') table: MatTable<any>;


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

  displayedColumnsStudyPlans: string[] = ['name'];
  displayedColumnsSubjects: string[] = ['name', 'add-icon'];
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
    // this.subjects = studyPlan.subjects;
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
    console.log(this.tables.toArray()[index]);
    console.log(index);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
    // console.log(this.tables.length);
    // console.log(this.table.dataSource);
    // this.table.dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    // this.studyPlansTable.renderRows();
    // this.table.renderRows();
    // this.cdr.detectChanges();
    // console.log(this.selectedStudyPlan);
    // console.log(this.studyPlans);
    // console.log(this.table.dataSource);
    // console.log(this.studyPlansTable.dataSource);
    // this.sortSubjectsForStudyPlan(this.selectedStudyPlan);
  }

  public getIndex(studyPlan: StudyPlan) {
    console.log('after get');
    this.studyPlans.entries();
    this.studyPlans.values();
    let i = -1;
    for (let studyPlanOb of this.studyPlans){
      i++;
      if (studyPlanOb.id === studyPlan.id){
        return i;
      }
    }
  }
  public deleteSubjectFromStudyPlan(subject: Subject) {

    for (let i = 0; i < this.selectedStudyPlan.subjects.length; ++i) {
      if (this.selectedStudyPlan.subjects[i].name === subject.name) {
        this.selectedStudyPlan.subjects.splice(i, 1);
      }
    }

    this.table.dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.studyPlansTable.renderRows();
    this.table.renderRows();
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
    this.table.dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.studyPlansTable.renderRows();
    this.table.renderRows();
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
    this.table.dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.studyPlansTable.renderRows();
    this.table.renderRows();
  }

  public editModeOn() {
    this.editMode = true;
    this.displayedColumnsForSubjects = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
      'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];
    this.studyPlansTable.renderRows();
    this.table.renderRows();
  }

  public editModeOff() {
    this.editMode = false;
    // this.displayedColumnsSingleStudyPlan = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
    //   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];
    this.displayedColumnsForSubjects = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
      'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];
    this.studyPlansTable.renderRows();
    this.table.renderRows();
  }

  public changeProperty(subject: Subject) {
    console.log('changeddddd');
    subject.isChanged = true;
  }

  public expandRow(studyPlan: StudyPlan) {
    this.expandedStudyPlan = this.expandedStudyPlan === studyPlan ? null : studyPlan;
    if (this.selectedStudyPlan === studyPlan) {
      this.selectedStudyPlan = null;
    } else {
      this.selectedStudyPlan = studyPlan;
    }
    this.editMode = false;
    this.studyPlansTable.renderRows();
    this.table.renderRows();
    console.log(this.selectedStudyPlan);
    // this.isStudyPlanSelected = !this.isStudyPlanSelected;
  }

  public createNewStudyPlan() {
    // this.dialog.open(CreateStudyPlanComponent, {
    //   // width: '700px',
    //   // height: '700px',
    //   // data: null,
    //   // scrollStrategy: this.overlay.scrollStrategies.noop()
    // });

    const dialogRef = this.dialog.open(CreateStudyPlanComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.studyPlans.push(result);
      console.log(result);
      console.log(this.studyPlans);
      this.studyPlansTable.renderRows();
      this.table.renderRows();
    });
  }

}
