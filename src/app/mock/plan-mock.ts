﻿import {StudyPlan} from '../model/study-plan.model';
import {SUBJECTS, SUBJECTS1} from './study-mock';
import {Subject} from '../model/subject.model';
import {EducationForm} from '../model/education-form.model';
import {StudyPlanStatus} from '../model/study-plan-status.model';
import {SEVERITY_EXAM, SEVERITY_LABS} from './severity-mock';

export const PLANS: StudyPlan[] = [{
  id: 1,
  name: 'Учебный план 1',
  countOfSem: 8,
  registerNumber: 45716,
  registerNumberApplyDate: new Date(),
  educationForm: EducationForm.FullTime,
  status: StudyPlanStatus.InDevelopment,
  statusApplyDate: new Date(),
  speciality: {id: 1, name: 'ISIT'},
  weeks: [15, 12, 12, 12, 12, 12, 12, 12],
  subjects: SUBJECTS,
  coefficient: 3,
  isChanged: false
}, {
  id: 2, name: 'Учебный план 2', countOfSem: 6,
  registerNumber: 45716,
  registerNumberApplyDate: new Date(),
  educationForm: EducationForm.FullTime,
  status: StudyPlanStatus.InDevelopment,
  statusApplyDate: new Date(),
  speciality: {id: 2, name: 'POIT'},
  weeks: [153, 123, 123, 123, 123, 123, 123, 123], subjects: SUBJECTS1, coefficient: 2, isChanged: false
}];

export const STUDY_PLANS_MOCK: StudyPlan[] = [
  {
    id: 1,
    name: 'Учебный план 1',
    registerNumber: 45716,
    registerNumberApplyDate: new Date(),
    educationForm: EducationForm.FullTime,
    status: StudyPlanStatus.InDevelopment,
    statusApplyDate: new Date(),
    speciality: {id: 2, name: 'POIT'},
    isChanged: false,
    subjects: [{
      id: 1,
      name: 'Графика',
      abbreviation: 'Граф',
      semesters: [],
      severities: [{id: 1, subjectId: 1, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 1, severity: SEVERITY_LABS, hours: 4}],
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
        abbreviation: 'БД',
        semesters: [],
        severities: [{id: 1, subjectId: 2, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 2, severity: SEVERITY_LABS, hours: 4}],
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
        abbreviation: 'ООП',
        semesters: [],
        severities: [{id: 1, subjectId: 3, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 3, severity: SEVERITY_LABS, hours: 4}],
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
        abbreviation: 'Py',
        semesters: [],
        severities: [{id: 1, subjectId: 4, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 4, severity: SEVERITY_LABS, hours: 4}],
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
    registerNumber: 45716,
    registerNumberApplyDate: new Date(),
    educationForm: EducationForm.FullTime,
    status: StudyPlanStatus.InDevelopment,
    statusApplyDate: new Date(),
    speciality: {id: 2, name: 'POIT'},
    isChanged: false,
    subjects: [{
      id: 4,
      name: 'Python',
      abbreviation: 'Py',
      semesters: [],
      severities: [{id: 1, subjectId: 4, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 4, severity: SEVERITY_LABS, hours: 4}],
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
        abbreviation: 'Физ',
        semesters: [],
        severities: [{id: 1, subjectId: 5, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 5, severity: SEVERITY_LABS, hours: 4}],
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
        abbreviation: 'Граф',
        semesters: [],
        severities: [{id: 1, subjectId: 6, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 6, severity: SEVERITY_LABS, hours: 4}],
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
    registerNumber: 45716,
    registerNumberApplyDate: new Date(),
    educationForm: EducationForm.FullTime,
    status: StudyPlanStatus.InDevelopment,
    statusApplyDate: new Date(),
    speciality: {id: 2, name: 'POIT'},
    isChanged: false,
    subjects: [{
      id: 7,
      name: 'Математика',
      abbreviation: 'Граф',
      semesters: [],
      severities: [{id: 1, subjectId: 7, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 7, severity: SEVERITY_LABS, hours: 4}],
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
        abbreviation: 'Граф',
        semesters: [],
        severities: [{id: 1, subjectId: 8, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 8, severity: SEVERITY_LABS, hours: 4}],
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

export const SUBJECTS_MOCK: Subject[] = [
  {
    id: 1,
    name: 'Графика',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 1, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 1, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 2, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 2, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 3, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 3, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 4, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 4, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 5, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 5, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 6, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 6, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 7, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 7, severity: SEVERITY_LABS, hours: 4}],
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
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: 1, subjectId: 8, severity: SEVERITY_EXAM, hours: 4}, {id: 2, subjectId: 8, severity: SEVERITY_LABS, hours: 4}],
    department: '',
    sumOfHours: 0,
    freeHours: 0,
    numberOfDiscipline: '',
    isChanged: false,
    position: 0
  }
];
