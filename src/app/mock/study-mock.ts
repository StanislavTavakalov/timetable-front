import { Subject } from '../model/subject.model';
import {SEMS, SEMS1} from './semester-mock';


export const SUBJECTS: Subject[] = [
  {
    id: 1,
    numberOfDiscipline: '1.1', name: 'sdfsdf',
    semesters:SEMS,
    department: 'werwer', sumOfHours: 100, freeHours: 40,
    isChanged: false,
    position: 1
  },
  {
    id: 2, numberOfDiscipline: '1.2', name: 'sdfsdf',
    semesters:SEMS1,
    department: 'werwer', sumOfHours: 100, freeHours: 52,
    isChanged: false,
    position: 2
  }
];


export const SUBJECTS1: Subject[] = [
  {
    id: 3, numberOfDiscipline: '1.3', name: 'Математика',
    semesters:SEMS1,
    department: 'werwer', sumOfHours : 450, freeHours : 72,
    isChanged: false,
    position: 1
  }
];
