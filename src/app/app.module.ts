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
import {EditableModeComponent} from './components/editable-mode/editable-mode.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DialogsModule} from './components/dialogs/dialogs.module';
import { EditStudyPlanComponent } from './components/dialogs/edit-study-plan/edit-study-plan.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CreateOccupationComponent } from './components/create-occupation/create-occupation.component';
import { DeaneryComponent } from './components/deanery/deanery.component';
import {JwtInterceptor} from './interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    StudyPlanComponent,
    HeaderComponent,
    TimetableComponent,
    FormForCreationComponent,
    EditableModeComponent,
    EditStudyPlanComponent,
    ScheduleComponent,
    CreateOccupationComponent,
    DeaneryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
