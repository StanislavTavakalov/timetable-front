import {SemesterNumber} from './semester-number.model';
import {PereodicSeverity} from './pereodic-severity.model';

export class PereodicSeveritySubject {
  id: string;
  pereodicSeverity: PereodicSeverity;
  semesterNumbers: SemesterNumber[];
}
