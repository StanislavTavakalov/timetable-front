import {Subject} from '../model/subject.model';
import {SEMS, SEMS1} from './semester-mock';
import {SEVERITY_EXAM, SEVERITY_LABS} from './severity-mock';
import {PEREODIC_SEVERITY_EXAMS, PEREODIC_SEVERITY_RGR} from './pereodic-severities-mock';


export const SUBJECTS: Subject[] = [
  {
    id: '1',
    numberOfDiscipline: '1.1', name: 'Математика', abbreviation: 'Мат',
    semesters: SEMS,
    severities: [{id: '1', subjectId: 1, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 1, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 1, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 1,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]}],
    department: 'Высшая математика', sumOfHours: 100, freeHours: 40,
    isChanged: false,
    position: 1
  },
  {
    id: '2', numberOfDiscipline: '1.2', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 2, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 2, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 2, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 2,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]}],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '3', numberOfDiscipline: '1.3', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 3, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 3, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 3, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 3,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]}],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '4', numberOfDiscipline: '1.4', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 4, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 4, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 4, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 4,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '5', numberOfDiscipline: '1.5', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 5, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 5, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 5, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 5,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '4', numberOfDiscipline: '1.4', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 6, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 6, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 1, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 1,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '5', numberOfDiscipline: '1.5', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 7, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 7, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 5, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 5,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '4', numberOfDiscipline: '1.4', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 8, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 8, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 4, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 4,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '5', numberOfDiscipline: '1.5', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 5, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 5, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 5, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 5,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '4', numberOfDiscipline: '1.4', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 4, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 4, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 4, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 4,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  },
  {
    id: '5', numberOfDiscipline: '1.5', name: 'Объектно-ориентированное программирование', abbreviation: 'ООП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 5, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 5, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 5, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 5,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  }
];


export const SUBJECTS1: Subject[] = [
  {
    id: '3', numberOfDiscipline: '1.3', name: 'Языки программирования', abbreviation: 'ЯП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 3, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 3, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 3, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 3,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ПОВТ', sumOfHours: 450, freeHours: 72,
    isChanged: false,
    position: 1
  }
];

export const SUBJECTS_EXAMPLES: Subject[] = [
  {
    id: '3', numberOfDiscipline: '1.3', name: 'Языки программирования', abbreviation: 'ЯП',
    semesters: SEMS1,
    severities: [{id: '1', subjectId: 3, severity: SEVERITY_EXAM, hours: 4}, {id: '2', subjectId: 3, severity: SEVERITY_LABS, hours: 4}],
    pereodicSeverities: [{id: '1', subjectId: 3, severity: PEREODIC_SEVERITY_EXAMS, semesterNumbers: [2]}, {
      id: '1',
      subjectId: 3,
      severity: PEREODIC_SEVERITY_RGR,
      semesterNumbers: [1, 3]
    }],
    department: 'ПОВТ', sumOfHours: 12, freeHours: 72,
    isChanged: false,
    position: 1
  }
];
