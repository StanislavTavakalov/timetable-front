import {Week} from './week.model';
import {OccupationCounter} from './occupatoionCounter.model';

export class Course {
  public id: number;
  public name: string;
  public weeks: Week[];
  public countOccupation: OccupationCounter[];
  public total: number;
}
