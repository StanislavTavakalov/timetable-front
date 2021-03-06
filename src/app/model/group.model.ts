import {Speciality} from './speciality.model';
import {Flow} from './flow.model';

export class Group {
  public id: string;
  public description: string;
  public name: string;
  public countOfStudents: number;
  public speciality: Speciality;
}
