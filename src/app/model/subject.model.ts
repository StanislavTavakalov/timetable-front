import {Semester} from './semester.model';

export class Subject {
public id: number;
public name: string;
public semesters: Semester[];
public department: string;
public sumOfHours: number;
public freeHours: number;
public numberOfDiscipline: string;
}
