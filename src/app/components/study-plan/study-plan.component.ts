import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {SubjectService} from '../../services/subject.service';

import {Observable} from 'rxjs';
import {MatRow, MatTable} from '@angular/material';
import {StudyPlan} from '../../model/study-plan.model';
import {Subject} from '../../model/subject.model';


const STUDY_PLANS_MOCK: StudyPlan[] = [
  {
    id: 1,
    name: 'Учебный план 1',
    subjects: [{id: 1, name: 'Графика', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
      {id: 2, name: 'Базы Данных (курс 1)', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
      {id: 3, name: 'ООП', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
      {id: 4, name: 'Python', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''}],
    countOfSem: 0, coefficient: 0, weeks: []
  },
  {
    id: 2,
    name: 'Учебный план 2',
    subjects: [{id: 4, name: 'Python', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
      {id: 5, name: 'Физика (курс 2)', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
      {id: 6, name: 'Java', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''}],
    countOfSem: 0, coefficient: 0, weeks: []
  },
  {
    id: 3,
    name: 'Учебный план 3',
    subjects: [{id: 7, name: 'Математика', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
      {id: 8, name: 'Алгоритмы', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''}],
    countOfSem: 0,
    coefficient: 0,
    weeks: []
  },
];

const SUBJECTS_MOCK: Subject[] = [
  {id: 1, name: 'Графика', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 2, name: 'Базы Данных (курс 1)', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 3, name: 'ООП', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 4, name: 'Python', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 5, name: 'Физика (курс 2)', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 6, name: 'Java', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 7, name: 'Математика', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''},
  {id: 8, name: 'Алгоритмы', semesters: [], department: '', sumOfHours: 0, freeHours: 0, numberOfDiscipline: ''}
];

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css']
})
export class StudyPlanComponent implements OnInit {


  constructor(private subjectService: SubjectService, private changeDetector: ChangeDetectorRef) {
  }

  @ViewChild('mytable', {static: false}) table: MatTable<any>;
  public subjects: Subject[];
  public studyPlans = STUDY_PLANS_MOCK;
  public selectedStudyPlan: StudyPlan;
  public allSubjects: Subject[];
  public editMode = false;

  displayedColumnsStudyPlans: string[] = ['name'];
  displayedColumnsSubjects: string[] = ['name', 'add-icon'];
  displayedColumnsSingleStudyPlan: string[] = ['swap', 'name', 'exams', 'offset', 'rgr', 'control-tasks',
    'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];


  ngOnInit() {
    // Getting from backend
    // this.subjectService.getSubjects().subscribe(success => {
    //   this.subjects = success;
    //   console.log(success);
    // });

    // MOCK
    // this.subjects = STUDY_PLANS_MOCK[0].subjects;
    this.editModeOff();
    this.selectedStudyPlan = STUDY_PLANS_MOCK[0];
    this.sortSubjectsForStudyPlan(STUDY_PLANS_MOCK[0]);
  }

  public selectStudyPlan(studyPlan: StudyPlan) {
    // this.subjects = studyPlan.subjects;
    this.selectedStudyPlan = studyPlan;
    this.sortSubjectsForStudyPlan(studyPlan);
  }

  public sortSubjectsForStudyPlan(studyPlan: StudyPlan) {
    this.allSubjects = SUBJECTS_MOCK.filter(val => !studyPlan.subjects.some(value => value.name === val.name));
    // this.allSubjects = SUBJECTS_MOCK;
  }

  public addSubjectToStudyPlan(subject: Subject) {
    this.selectedStudyPlan.subjects.push(subject);
    this.table.dataSource = this.selectedStudyPlan.subjects;
    this.table.renderRows();
    this.sortSubjectsForStudyPlan(this.selectedStudyPlan);
  }

  public deleteSubjectFromStudyPlan(subject: Subject) {

    for (let i = 0; i < this.selectedStudyPlan.subjects.length; ++i) {
      if (this.selectedStudyPlan.subjects[i].name === subject.name) {
        this.selectedStudyPlan.subjects.splice(i, 1);
      }
    }

    this.table.dataSource = this.selectedStudyPlan.subjects;
    this.table.renderRows();
    this.sortSubjectsForStudyPlan(this.selectedStudyPlan);
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
    this.table.dataSource = this.selectedStudyPlan.subjects;
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
    this.table.dataSource = this.selectedStudyPlan.subjects;
    this.table.renderRows();
  }

  public editModeOn() {
    this.editMode = true;
    this.displayedColumnsSingleStudyPlan = ['swap', 'name', 'exams', 'offset', 'rgr', 'control-tasks',
      'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks', 'delete-icon'];
  }

  public editModeOff() {
    this.editMode = false;
    this.displayedColumnsSingleStudyPlan = ['name', 'exams', 'offset', 'rgr', 'control-tasks',
      'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];
  }

}
