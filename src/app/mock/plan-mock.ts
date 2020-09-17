import {StudyPlan} from '../model/study-plan.model';
import {SUBJECTS, SUBJECTS1} from './study-mock';
import {Subject} from '../model/subject.model';
import {EducationForm} from '../model/education-form.model';
import {StudyPlanStatus} from '../model/study-plan-status.model';
import {SEVERITY_EXAM, SEVERITY_LABS} from './severity-mock';
import {PEREODIC_SEVERITY_EXAMS, PEREODIC_SEVERITY_RGR} from './pereodic-severities-mock';

export const PLANS: StudyPlan[] = [{
  id: '1',
  name: 'Учебный план 1',
  countOfSem: 8,
  schedules: null,
  registerNumber: 45716,
  registerNumberApplyDate: new Date(),
  educationForm: EducationForm.FullTime,
  status: StudyPlanStatus.InDevelopment,
  statusApplyDate: new Date(),
  speciality: {id: '1', description: 'test', name: 'ISIT', abbreviation: 'ISIT', code: '140404-2112'},
  weeks: [{id: '600', count: 15, position: 1}, {id: '601', count: 15, position: 2}, {id: '602', count: 15, position: 3},
    {id: '603', count: 15, position: 4}, {id: '604', count: 15, position: 5}, {id: '605', count: 15, position: 6},
    {id: '606', count: 15, position: 7}, {id: '607', count: 15, position: 8}],
  subjects: SUBJECTS,
  coefficient: 3,
  isChanged: false,
  year: 2020
}, {
  id: '2', name: 'Учебный план 2', countOfSem: 6,
  schedules: null,
  registerNumber: 45716,
  registerNumberApplyDate: new Date(),
  educationForm: EducationForm.FullTime,
  status: StudyPlanStatus.InDevelopment,
  statusApplyDate: new Date(),
  speciality: {id: '2', description: 'test', name: 'POIT', abbreviation: 'POIT', code: '140404-2112'},
  weeks: [{id: '600', count: 15, position: 1}, {id: '601', count: 15, position: 2}, {id: '602', count: 15, position: 3},
    {id: '603', count: 15, position: 4}, {id: '604', count: 15, position: 5}, {id: '605', count: 15, position: 6},
    {id: '606', count: 15, position: 7}, {id: '607', count: 15, position: 8}],
  subjects: SUBJECTS1, coefficient: 2, isChanged: false, year: 2020
}];

export const STUDY_PLANS_MOCK: StudyPlan[] = [
  {
    id: '1',
    name: 'Учебный план 1',
    schedules: null,
    registerNumber: 45716,
    registerNumberApplyDate: new Date(),
    educationForm: EducationForm.FullTime,
    status: StudyPlanStatus.InDevelopment,
    statusApplyDate: new Date(),
    speciality: {id: '2', description: 'test', name: 'POIT', abbreviation: 'POIT', code: '140404-2112'},
    isChanged: false,
    subjects: [{
      id: '1',
      name: 'Графика',
      abbreviation: 'Граф',
      semesters: [],
      severities: [{id: '2', severity: SEVERITY_LABS, hours: 4}],
      pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
        id: '1',
        pereodicSeverity: PEREODIC_SEVERITY_RGR,
        semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
      }],
      department: '',
      description: 'sss',
      sumOfHours: 0,
      freeHours: 0,
      isChanged: false,
      template: false,
      position: 1,
    },
      {
        id: '2',
        name: 'Базы Данных (курс 1)',
        abbreviation: 'БД',
        semesters: [],
        severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {
          id: '2',
          severity: SEVERITY_LABS,
          hours: 4
        }],
        pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
          id: '1',
          pereodicSeverity: PEREODIC_SEVERITY_RGR,
          semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
        }],
        department: '',
        description: 'sss',
        sumOfHours: 0,
        freeHours: 0,
        isChanged: false,
        template: false,
        position: 2
      },
      {
        id: '3',
        name: 'ООП',
        abbreviation: 'ООП',
        semesters: [],
        severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {
          id: '2',
          severity: SEVERITY_LABS,
          hours: 4
        }],
        pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
          id: '1',
          pereodicSeverity: PEREODIC_SEVERITY_RGR,
          semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
        }],
        department: '',
        description: 'sss',
        sumOfHours: 0,
        freeHours: 0,
        isChanged: false,
        template: false,
        position: 3
      },
      {
        id: '4',
        name: 'Python',
        abbreviation: 'Py',
        semesters: [],
        severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {
          id: '2',
          severity: SEVERITY_LABS,
          hours: 4
        }],
        pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
          id: '1',
          pereodicSeverity: PEREODIC_SEVERITY_RGR,
          semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
        }],
        department: '',
        description: 'sss',
        sumOfHours: 0,
        freeHours: 0,
        isChanged: false,
        template: false,
        position: 4
      }],
    countOfSem: 0, coefficient: 0, weeks: [], year: 2020
  },
  {
    id: '2',
    name: 'Учебный план 2',
    registerNumber: 45716,
    registerNumberApplyDate: new Date(),
    schedules: null,
    educationForm: EducationForm.FullTime,
    status: StudyPlanStatus.InDevelopment,
    statusApplyDate: new Date(),
    speciality: {id: '2', description: 'test', name: 'POIT', abbreviation: 'POIT', code: '140404-2112'},
    isChanged: false,
    subjects: [{
      id: '4',
      name: 'Python',
      abbreviation: 'Py',
      semesters: [],
      severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
      pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
        id: '1',
        pereodicSeverity: PEREODIC_SEVERITY_RGR,
        semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
      }],
      department: '',
      description: 'sss',
      sumOfHours: 0,
      freeHours: 0,
      isChanged: false,
      template: false,
      position: 1
    },
      {
        id: '5',
        name: 'Физика (курс 2)',
        abbreviation: 'Физ',
        semesters: [],
        severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {
          id: '2',
          severity: SEVERITY_LABS,
          hours: 4
        }],
        pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
          id: '1',
          pereodicSeverity: PEREODIC_SEVERITY_RGR,
          semesterNumbers: [{id: '1', number: 1}, {id: '1', number: 3}]
        }],
        department: '',
        description: 'sss',
        sumOfHours: 0,
        freeHours: 0,
        isChanged: false,
        template: false,
        position: 2
      },
      {
        id: '6',
        name: 'Java',
        abbreviation: 'Граф',
        semesters: [],
        severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {
          id: '2',
          severity: SEVERITY_LABS,
          hours: 4
        }],
        pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
          id: '1',
          pereodicSeverity: PEREODIC_SEVERITY_RGR,
          semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
        }],
        department: '',
        description: 'sss',
        sumOfHours: 0,
        freeHours: 0,
        isChanged: false,
        template: false,
        position: 3
      }],
    countOfSem: 0, coefficient: 0, weeks: [], year: 2020
  },
  {
    id: '3',
    name: 'Учебный план 3',
    registerNumber: 45716,
    registerNumberApplyDate: new Date(),
    schedules: null,
    educationForm: EducationForm.FullTime,
    status: StudyPlanStatus.InDevelopment,
    statusApplyDate: new Date(),
    speciality: {id: '2', description: 'test', name: 'POIT', abbreviation: 'POIT', code: '140404-2112'},
    isChanged: false,
    subjects: [{
      id: '7',
      name: 'Математика',
      abbreviation: 'Граф',
      semesters: [],
      severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
      pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
        id: '1',
        pereodicSeverity: PEREODIC_SEVERITY_RGR,
        semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
      }],
      department: '',
      description: 'sss',
      sumOfHours: 0,
      freeHours: 0,
      isChanged: false,
      template: false,
      position: 1
    },
      {
        id: '8',
        name: 'Алгоритмы',
        abbreviation: 'Граф',
        semesters: [],
        severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {
          id: '2',
          severity: SEVERITY_LABS,
          hours: 4
        }],
        pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
          id: '1',
          pereodicSeverity: PEREODIC_SEVERITY_RGR,
          semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
        }],
        department: '',
        description: 'sss',
        sumOfHours: 0,
        freeHours: 0,
        isChanged: false,
        template: false,
        position: 2
      }],
    countOfSem: 0,
    coefficient: 0,
    weeks: [],
    year: 2020
  },
];

export const SUBJECTS_MOCK: Subject[] = [
  {
    id: '1',
    name: 'Графика',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '2',
    name: 'Базы Данных (курс 1)',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '3',
    name: 'ООП',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '4',
    name: 'Python',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '5',
    name: 'Физика (курс 2)',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '6',
    name: 'Java',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '7',
    name: 'Математика',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  },
  {
    id: '8',
    name: 'Алгоритмы',
    abbreviation: 'Граф',
    semesters: [],
    severities: [{id: '1', severity: SEVERITY_EXAM, hours: 4}, {id: '2', severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', pereodicSeverity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [{id: '2', number: 2}]}, {
      id: '1',
      pereodicSeverity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [{id: '1', number: 1}, {id: '3', number: 3}]
    }],
    department: '',
    description: 'sss',
    sumOfHours: 0,
    freeHours: 0,
    isChanged: false,
    template: false,
    position: 0
  }
];
