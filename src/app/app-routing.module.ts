import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPlanComponent} from './components/study-plan/study-plan.component';
import {TimetableComponent} from './components/timetable/timetable.component';
import {FormForCreationComponent} from './components/form-for-creation/form-for-creation.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {SpecialitiesComponent} from './components/specialities/specialities.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {TeachersComponent} from './components/teachers/teachers.component';
import {SubjectAddEditComponent} from './components/subjects/subject-add-edit/subject-add-edit.component';
import {SubjectComponent} from './components/subjects/subject/subject.component';
import {DeaneryMainComponent} from './components/deanery-main/deanery-main.component';
import {DeaneryStaffMainComponent} from './components/deanery-staff-main/deanery-staff-main.component';
import {GroupMainComponent} from './components/group-main/group-main.component';
import {FlowMainComponent} from './components/flow-main/flow-main.component';



const routes: Routes = [
  {path: 'lectern/:id/distribution_courses_semesters', component: TimetableComponent},
  {path: 'lectern/:id/distribution_courses_semesters/:sp_id', component: TimetableComponent},
  {path: 'creation', component: FormForCreationComponent},
  {path: 'lectern/:id/schedule/:idStudyPlan', component: ScheduleComponent},
  {path: 'deanery/:id', component: DeaneryMainComponent},
  {path: 'deanery/:id/lecterns', component: DeaneryMainComponent},
  {path: 'deanery/:id/staff', component: DeaneryStaffMainComponent},
  {path: 'deanery/:id/groups', component: GroupMainComponent},
  {path: 'deanery/:id/flows', component: FlowMainComponent},
  {path: 'lectern/:id', component: SpecialitiesComponent},
  {path: 'lectern/:id/study-plans', component: StudyPlanComponent},
  {path: 'lectern/:id/subjects/subject-edit/:subjectId', component: SubjectAddEditComponent},
  {path: 'lectern/:id/subjects/subject-edit', component: SubjectAddEditComponent},
  {path: 'lectern/:id/subjects/:subjectId', component: SubjectComponent},
  {path: 'lectern/:id/subjects', component: SubjectsComponent},
  {path: 'lectern/:id/specialities', component: SpecialitiesComponent},
  {path: 'lectern/:id/teachers', component: TeachersComponent},
  {path: '**', redirectTo: 'lectern/:id'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
