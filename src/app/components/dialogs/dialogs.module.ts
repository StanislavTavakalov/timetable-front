import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material';
import {CreateStudyPlanComponent} from './create-study-plan/create-study-plan.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [CreateStudyPlanComponent, ConfirmationComponent],
  exports: [CreateStudyPlanComponent, ConfirmationComponent],
  entryComponents: [CreateStudyPlanComponent, ConfirmationComponent]
})
export class DialogsModule {
}
