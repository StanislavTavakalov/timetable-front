import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPlanComponent} from './components/study-plan/study-plan.component';
import {TimetableComponent} from './components/timetable/timetable.component';
import {EditableModeComponent} from './components/editable-mode/editable-mode.component';
import {FormForCreationComponent} from './components/form-for-creation/form-for-creation.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {CreateOccupationComponent} from './components/create-occupation/create-occupation.component';
import {DeaneryComponent} from './components/deanery/deanery.component';
import {SpecialitiesComponent} from './components/specialities/specialities.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {TeachersComponent} from './components/teachers/teachers.component';


const routes: Routes = [
  {path: 'lectern/:id/distribution_courses_semesters', component: TimetableComponent},
  {path: 'creation', component: FormForCreationComponent},
  {path: 'lectern/:id/schedule/:idStudyPlan', component: ScheduleComponent},
  {path: 'edit', component: EditableModeComponent},
  {path: 'edit1', component: CreateOccupationComponent},
  {path: 'deanery/:id', component: DeaneryComponent},
  {path: 'lectern/:id', component: SpecialitiesComponent},
  {path: 'lectern/:id/study-plans', component: StudyPlanComponent},
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
