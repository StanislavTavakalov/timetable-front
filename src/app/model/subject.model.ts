import {Semester} from './semester.model';
import {SeveritySubject} from './severity-subject.model';

export class Subject {
  public id: string;
  public name: string;
  public abbreviation: string;
  public semesters: Semester[];
  public severities: SeveritySubject[];
  public pereodicSeverities: PereodicSeveritySubject[];
  public department: string;
  public sumOfHours: number;
  public freeHours: number;
  public numberOfDiscipline: string;
  public isChanged = false;
  public position: number;

}
