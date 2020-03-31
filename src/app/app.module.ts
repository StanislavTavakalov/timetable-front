import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {StudyPlanComponent} from './components/study-plan/study-plan.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { HeaderComponent } from './components/header/header.component';
import {TimetableComponent} from './components/timetable/timetable.component';
import {FormForCreationComponent} from './components/form-for-creation/form-for-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DialogsModule} from './components/dialogs/dialogs.module';
import { EditStudyPlanComponent } from './components/dialogs/edit-study-plan/edit-study-plan.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DeaneryComponent } from './components/deanery/deanery.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import {SpecialitiesComponent} from './components/specialities/specialities.component';
import {TeachersComponent} from './components/teachers/teachers.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {SpecialityDatatableComponent} from './components/specialities/speciality-datatable/speciality-datatable.component';
import {FooterComponent} from './components/footer/footer.component';
import {NotifierModule} from 'angular-notifier';
import {customNotifierOptions} from './notifier-options';
import { DeaneryStaffComponent } from './components/deanery-staff/deanery-staff.component';
import { TeacherDatatableComponent } from './components/teachers/teacher-datatable/teacher-datatable.component';


@NgModule({
  declarations: [
    AppComponent,
    StudyPlanComponent,
    HeaderComponent,
    TimetableComponent,
    FormForCreationComponent,
    EditStudyPlanComponent,
    ScheduleComponent,
    DeaneryComponent,
    SpecialitiesComponent,
    TeachersComponent,
    SubjectsComponent,
    SpecialityDatatableComponent,
    FooterComponent,
    DeaneryStaffComponent,
    TeacherDatatableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
