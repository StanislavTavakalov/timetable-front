import {Subject} from './subject.model';

export class StudyPlan {
  public id: number;
  public name: string;
  public subjects: Subject[];
  public coefficient: number;
  public countOfSem: number;
  public weeks: number[];
  public isChanged: boolean;
}
