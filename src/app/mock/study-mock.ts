import { Subject } from '../model/subject.model';
import {SEMS, SEMS1} from './semester-mock';


export const SUBJECTS: Subject[] = [
  {
    id: 1,
    numberOfDiscipline: '1.1', name: 'Математика',
    semesters: SEMS,
    department: 'Высшая математика', sumOfHours: 100, freeHours: 40,
    isChanged: false,
    position: 1
  },
  {
    id: 2, numberOfDiscipline: '1.2', name: 'ООП',
    semesters: SEMS1,
    department: 'ИСИТ', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  }
];


export const SUBJECTS1: Subject[] = [
  {
    id: 3, numberOfDiscipline: '1.3', name: 'ЯП',
    semesters: SEMS1,
    department: 'ПОВТ', sumOfHours : 450, freeHours : 72,
    isChanged: false,
    position: 1
  }
];

export  const SUBJECTS_EXAMPLES: Subject[] = [
  {
    id: 3, numberOfDiscipline: '1.3', name: 'ЯП',
    semesters: SEMS1,
    department: 'ПОВТ', sumOfHours : 12, freeHours : 72,
    isChanged: false,
    position: 1
  }
];
