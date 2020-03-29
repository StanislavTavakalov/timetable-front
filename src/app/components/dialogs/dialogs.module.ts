import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material';
import {CreateStudyPlanComponent} from './study-plans/create-study-plan/create-study-plan.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {StudyPlanDetailsComponent} from './study-plans/study-plan-details/study-plan-details.component';
import {EditSubjectComponent} from './edit-subject/edit-subject.component';
import {SpecialityAddEditComponent} from './speciality/speciality-add-edit/speciality-add-edit.component';
import { SpecialityDeleteComponent } from './speciality/speciality-delete/speciality-delete.component';
import {CreateLecternComponent} from '../create-lectern/create-lectern.component';
import {TeacherViewComponent} from './teacher-view/teacher-view.component';
import { TeacherAddEditComponent } from './teachers/teacher-add-edit/teacher-add-edit.component';
import { TeacherDeleteComponent } from './teachers/teacher-delete/teacher-delete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CreateStudyPlanComponent, ConfirmationComponent,
    StudyPlanDetailsComponent, EditSubjectComponent, SpecialityAddEditComponent, SpecialityDeleteComponent,
    TeacherAddEditComponent, TeacherDeleteComponent, TeacherViewComponent, CreateLecternComponent],
  exports: [CreateStudyPlanComponent, ConfirmationComponent,
    StudyPlanDetailsComponent, EditSubjectComponent, SpecialityAddEditComponent,
    TeacherAddEditComponent, TeacherDeleteComponent, SpecialityDeleteComponent, TeacherViewComponent, CreateLecternComponent],
  entryComponents: [CreateStudyPlanComponent, ConfirmationComponent,
    StudyPlanDetailsComponent, EditSubjectComponent, SpecialityAddEditComponent,
    TeacherAddEditComponent, TeacherDeleteComponent, SpecialityDeleteComponent, TeacherViewComponent, CreateLecternComponent]
})
export class DialogsModule {
}
