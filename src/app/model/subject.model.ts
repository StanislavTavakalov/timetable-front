import {Semester} from './semester.model';
import {SeveritySubject} from './severity-subject.model';
import {PereodicSeveritySubject} from './pereodic-severity-subject.model';

export class Subject {
  public id: string;
  public name: string;
  public abbreviation: string;
  public semesters: Semester[];
  public severities: SeveritySubject[];
  public pereodicSeverities: PereodicSeveritySubject[];
  public description: string;
  public department: string;
  public sumOfHours: number;
  public freeHours: number;
  public template: boolean;
  public isChanged = false;
  public position: number;
}


export const defaultSubject: Subject = {
  id: null,
  name: '',
  abbreviation: '',
  semesters: [],
  severities: [],
  pereodicSeverities: [],
  description: '',
  department: '',
  sumOfHours: 0,
  freeHours: 0,
  template: true,
  isChanged: false,
  position: null,
};
