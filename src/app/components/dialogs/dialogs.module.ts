import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material';
import {CreateStudyPlanComponent} from './create-study-plan/create-study-plan.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {StudyPlanDetailsComponent} from './study-plan-details/study-plan-details.component';
import {EditSubjectComponent} from './edit-subject/edit-subject.component';
import {SpecialityAddEditComponent} from './speciality/speciality-add-edit/speciality-add-edit.component';
import { SpecialityDeleteComponent } from './speciality/speciality-delete/speciality-delete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CreateStudyPlanComponent, ConfirmationComponent,
    StudyPlanDetailsComponent, EditSubjectComponent, SpecialityAddEditComponent, SpecialityDeleteComponent],
  exports: [CreateStudyPlanComponent, ConfirmationComponent,
    StudyPlanDetailsComponent, EditSubjectComponent, SpecialityAddEditComponent, SpecialityDeleteComponent],
  entryComponents: [CreateStudyPlanComponent, ConfirmationComponent,
    StudyPlanDetailsComponent, EditSubjectComponent, SpecialityAddEditComponent, SpecialityDeleteComponent]
})
export class DialogsModule {
}
