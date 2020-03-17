import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {StudyPlan} from '../../../model/study-plan.model';
import {EducationForm} from '../../../model/education-form.model';
import {StudyPlanStatus} from '../../../model/study-plan-status.model';
import {Speciality} from '../../../model/speciality.model';

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

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateStudyPlanComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.message = this.data.message;
    this.currentStudyPlan = this.data.currentStudyPlan;
    console.log(this.currentStudyPlan);
    this.educationFormList.push(EducationForm.FullTime, EducationForm.Extramural);
    this.specialityList.push({id: '1', name: 'ISIT'}, {id: '2', name: 'POIT'});
    if (this.currentStudyPlan != null) {
      this.initializeForm(this.currentStudyPlan);
    } else {
      this.initializeForm(new StudyPlan());
    }
    console.log(this.speciality);
  }

  private initializeForm(studyPlan: StudyPlan) {
    this.createStudyPlanForm = this.fb.group({
      studyPlanName: [studyPlan.name, [Validators.required, Validators.maxLength(15)]],
      educationForm: [studyPlan.educationForm, [Validators.required]],
      speciality: [studyPlan.speciality, [Validators.required]],
    });
  }

  getErrorText(controlName: string): string {
    const control = this.createStudyPlanForm.get(controlName) as FormControl;
    return this.getErrorMessage(control);
  }

  private getErrorMessage(control: FormControl): string {
    let errorMessage = '';
    if (control.errors) {
      if (control.errors['required']) {
        errorMessage = 'Заполните имя';
      }
      if (control.errors['maxlength']) {
        errorMessage = 'Max 15 digits';
      }
    }
    return errorMessage;
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

  onCancelClick() {
    this.dialogRef.close();
  }

  confirm() {
    const nameOfStudyPlanF = this.createStudyPlanForm.controls.studyPlanName.value;
    const educationFormF = this.createStudyPlanForm.controls.educationForm.value;
    const specialityF = this.createStudyPlanForm.controls.speciality.value;
    console.log(this.currentStudyPlan);
    if (this.currentStudyPlan === undefined || this.currentStudyPlan === null) {
      this.dialogRef.close(
        // {id: 555, name: nameOfStudyPlan, subjects: [], coefficient: 0, countOfSem: 0, weeks: 0, isChanged: false}
        {
          id: this.getRandomInt(1000),
          name: nameOfStudyPlanF,
          countOfSem: 0,
          registerNumber: this.getRandomInt(10000),
          registerNumberApplyDate: new Date(),
          educationForm: educationFormF,
          status: StudyPlanStatus.InDevelopment,
          statusApplyDate: new Date(),
          speciality: specialityF,
          weeks: [],
          subjects: [],
          coefficient: [],
          isChanged: false
        }
      );
    } else {
      this.currentStudyPlan.name = nameOfStudyPlanF;
      this.currentStudyPlan.educationForm = educationFormF;
      this.currentStudyPlan.speciality = specialityF;
      this.dialogRef.close(this.currentStudyPlan);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
