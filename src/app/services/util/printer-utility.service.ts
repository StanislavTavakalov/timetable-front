import {Injectable} from '@angular/core';
import {StaffType} from '../../model/staff-type.model';
import {EducationForm} from '../../model/education-form.model';
import {StudyPlanStatus} from '../../model/study-plan-status.model';
import {Subject} from '../../model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class PrinterUtilityService {

  constructor() {
  }

  printValue(value) {
    return value ? value : 'Не указано';
  }

  printAcademicDegree(academicDegree, abbreviation) {
    if (academicDegree && academicDegree !== '') {
      if (abbreviation) {
        return academicDegree + ' (' + abbreviation + ') ';
      } else {
        return academicDegree;
      }
    } else {
      return 'Не указано';
    }
  }

  printStaffType(staffType: StaffType, rate: number): string {
    switch (staffType) {
      case StaffType.ExternalCombiner:
        return 'Внешний совместитель' + ' (Ставка: ' + rate + ')';
      case StaffType.FullTime:
        return 'Штатный';
      case StaffType.PartTime:
        return 'Почасовик' + ' (Часов: ' + rate + ')';
      case StaffType.InternalCombiner:
        return 'Внутренний совместитель' + ' (Ставка: ' + rate + ')';
      case staffType:
        return 'Не указано';
    }
  }

  printEducationForm(educationForm: EducationForm) {
    switch (educationForm) {
      case EducationForm.FullTime:
        return 'Очная форма';
      case EducationForm.Extramural:
        return 'Заочная форма';
      case educationForm:
        return 'Не указано';
    }
  }

  printStudyPlanStatus(studyPlanStatus: StudyPlanStatus) {
    switch (studyPlanStatus) {
      case StudyPlanStatus.ToRegister:
        return 'На регистрацию';
      case StudyPlanStatus.ToRefactor:
        return 'На переработку';
      case StudyPlanStatus.Submitted:
        return 'Подтвержен';
      case StudyPlanStatus.Registered:
        return 'Зарегистрирован';
      case StudyPlanStatus.Refactored:
        return 'Переработан';
      case StudyPlanStatus.InDevelopment:
        return 'В разработке';
      case studyPlanStatus:
        return 'Не указан';
    }
  }

  printRegisterNumber(registerNumber: number) {
    return registerNumber === null ? 'не указан' : registerNumber;
  }


  printSeverityValue(subject: Subject, name: string) {
    for (const severity of subject.severities) {
      if (severity.severity.name === name) {
        return severity.hours;
      }
    }
    return '-';
  }

  printPereodicValue(subject: Subject, name: string) {
    for (const pereodicSeverity of subject.pereodicSeverities) {
      if (pereodicSeverity.pereodicSeverity.name === name) {
        let result = '';
        for (const semNumber of pereodicSeverity.semesterNumbers) {
          result += semNumber.number + '; ';
        }
        if (result === '') {
          return 0;
        }
        return result;
      }
    }
    return '-';
  }

  printAdditionalSubjectTemplateInfo(subject: Subject) {
    let additionalInfo = ' ';
    if (subject.severities.length > 0) {
      additionalInfo += '[';
      for (const severity of subject.severities) {
        additionalInfo += severity.severity.name + ': ' + severity.hours + '; ';
      }
      additionalInfo += '] ';
    }

    if (subject.pereodicSeverities.length > 0) {
      additionalInfo += '[';
      for (const severity of subject.pereodicSeverities) {
        additionalInfo += severity.pereodicSeverity.name + '; ';

      }
      additionalInfo += ']';
    }
    return additionalInfo;
  }

  public printAuditLessonsHours(subject: Subject) {
    let sumOfHours = 0;
    for (const sev of subject.severities) {
      sumOfHours += sev.hours as number;
    }
    return sumOfHours;
  }

}
