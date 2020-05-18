import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StudyPlan} from '../../../../model/study-plan.model';
import {EducationForm} from '../../../../model/education-form.model';
import {StudyPlanStatus} from '../../../../model/study-plan-status.model';
import {Speciality} from '../../../../model/speciality.model';
import {SpecialityService} from '../../../../services/lectern/speciality.service';
import {NotifierService} from 'angular-notifier';
import {isSemNumberExposed} from '../../../../validators/semnumber-exposing.validator';

@Component({
  selector: 'app-create-study-plan',
  templateUrl: './create-study-plan.component.html',
  styleUrls: ['./create-study-plan.component.css']
})
export class CreateStudyPlanComponent implements OnInit {

  createStudyPlanForm: FormGroup;
  message: string;
  currentStudyPlan: StudyPlan = new StudyPlan();
  educationFormList: EducationForm[] = [];
  specialityList: Speciality[] = [];
  lecternId: string;
  maxSemNumberExposed: number;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateStudyPlanComponent>,
              private specialityService: SpecialityService,
              private notifierService: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

    this.lecternId = this.data.lecternId;
    this.message = this.data.message;
    this.currentStudyPlan = this.data.currentStudyPlan;

    this.educationFormList.push(EducationForm.FullTime, EducationForm.Extramural);

    this.specialityService.getSpecialities(this.lecternId).subscribe(specialities => {
      for (const speciality of specialities) {
        this.specialityList.push(speciality);
      }
    }, error => {
      this.notifierService.notify('error', 'Не удалось загрузить специальности.');
    });

    if (this.currentStudyPlan != null) {
      this.maxSemNumberExposed = this.getMaxExposedSemNumber(this.currentStudyPlan);
      this.initializeForm(this.currentStudyPlan);
    } else {
      this.maxSemNumberExposed = 0;
      this.initializeForm(new StudyPlan());
    }
    console.log(this.speciality);
  }

  private initializeForm(studyPlan: StudyPlan) {
    this.createStudyPlanForm = this.fb.group({
      studyPlanName: [studyPlan.name, [Validators.required, Validators.maxLength(20)]],
      educationForm: [studyPlan.educationForm, [Validators.required]],
      speciality: [studyPlan.speciality, [Validators.required]],
      countOfSem: [studyPlan.countOfSem, [isSemNumberExposed(this.maxSemNumberExposed),
        Validators.required, Validators.min(1), Validators.max(12)]],
      coefficient: [studyPlan.coefficient, [Validators.min(0), Validators.max(15)]],
      year: [studyPlan.year, [Validators.required, Validators.min(1900), Validators.max(2100)]]
    });
  }

  get studyPlanName(): FormControl {
    return this.createStudyPlanForm.get('studyPlanName') as FormControl;
  }

  get educationForm(): FormControl {
    return this.createStudyPlanForm.get('educationForm') as FormControl;
  }

  get speciality(): FormControl {
    return this.createStudyPlanForm.get('speciality') as FormControl;
  }

  get countOfSem(): FormControl {
    return this.createStudyPlanForm.get('countOfSem') as FormControl;
  }

  get coefficient(): FormControl {
    return this.createStudyPlanForm.get('coefficient') as FormControl;
  }

  get year(): FormControl {
    return this.createStudyPlanForm.get('year') as FormControl;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  confirm() {
    const nameOfStudyPlanF = this.createStudyPlanForm.controls.studyPlanName.value;
    const educationFormF = this.createStudyPlanForm.controls.educationForm.value;
    const specialityF = this.createStudyPlanForm.controls.speciality.value;
    const countOfSemF = this.createStudyPlanForm.controls.countOfSem.value;
    const coefficientF = this.createStudyPlanForm.controls.coefficient.value;
    const yearF = this.createStudyPlanForm.controls.year.value;
    if (this.currentStudyPlan === undefined || this.currentStudyPlan === null) {
      const newStudyPlan = new StudyPlan();
      newStudyPlan.name = nameOfStudyPlanF;
      newStudyPlan.educationForm = educationFormF;
      newStudyPlan.speciality = specialityF;
      newStudyPlan.coefficient = coefficientF;
      newStudyPlan.countOfSem = countOfSemF;
      newStudyPlan.status = StudyPlanStatus.InDevelopment;
      newStudyPlan.statusApplyDate = new Date();
      newStudyPlan.year = yearF;
      this.dialogRef.close(newStudyPlan);
    } else {
      this.currentStudyPlan.name = nameOfStudyPlanF;
      this.currentStudyPlan.educationForm = educationFormF;
      this.currentStudyPlan.speciality = specialityF;
      this.currentStudyPlan.coefficient = coefficientF;
      this.currentStudyPlan.countOfSem = countOfSemF;
      this.currentStudyPlan.year = yearF;
      this.dialogRef.close(this.currentStudyPlan);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (!o2) {
      return false;
    }
    return o1.name === o2.name && o1.id === o2.id;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  public localizeEducationForm(educationForm: EducationForm): string {
    switch (educationForm) {
      case EducationForm.FullTime:
        return 'Очная';
      case EducationForm.Extramural:
        return 'Заочная';
    }
  }

  private getMaxExposedSemNumber(studyPlan: StudyPlan) {
    let maxExposedSemNumber = 0;
    for (const subject of studyPlan.subjects) {
      for (const pereodicSeverity of subject.pereodicSeverities) {
        for (const semNumber of pereodicSeverity.semesterNumbers) {
          if (semNumber.number > maxExposedSemNumber) {
            maxExposedSemNumber = semNumber.number;
          }
        }
      }
    }
    return maxExposedSemNumber;
  }
}
