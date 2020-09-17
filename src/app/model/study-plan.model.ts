import {Subject} from './subject.model';
import {Speciality} from './speciality.model';
import {EducationForm} from './education-form.model';
import {StudyPlanStatus} from './study-plan-status.model';
import {WeekCount} from './week-count.model';
import {Schedule} from './shedule.model';

export class StudyPlan {
  public id: string = null;
  public name: string;
  public subjects: Subject[] = [];
  public coefficient: number;
  public countOfSem: number;
  public schedules: Schedule[] = [];
  public weeks: WeekCount[] = [];
  public isChanged: boolean;
  public speciality: Speciality;
  public status: StudyPlanStatus;
  public statusApplyDate: Date;
  public registerNumber: number;
  public registerNumberApplyDate: Date;
  public educationForm: EducationForm;
  public year: number;
}
