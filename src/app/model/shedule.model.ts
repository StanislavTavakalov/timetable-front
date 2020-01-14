import {Course} from './course.model';
import {OccupationCounter} from './occupatoionCounter.model';

export class Schedule {
  public id: number;
  public courses: Course[];
  public countOccupation: OccupationCounter[];
}
