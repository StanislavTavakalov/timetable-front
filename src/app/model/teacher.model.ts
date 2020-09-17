import {StaffType} from './staff-type.model';

export class Teacher {
  public id: string;
  public name: string;
  public patronymic: string;
  public surname: string;
  public position: string;
  public academicRank: string;
  public academicDegree: string;
  public academicDegreeAbbreviation: string;
  public additionalInfo: string;
  public staffType: StaffType;
  public rate: number;
}
