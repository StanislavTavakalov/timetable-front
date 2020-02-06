import {Week} from './week.model';
import {OccupationCounter} from './occupatoionCounter.model';
import {OccupationCounterCourse} from './occupationCounterCourse.model';

export class Course {
  public id: number;
  public name: string;
  public weeks: Week[];
  public countOccupation: OccupationCounterCourse[];
  public total: number;
}
