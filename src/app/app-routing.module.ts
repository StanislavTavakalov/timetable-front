import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPlanComponent} from './components/study-plan/study-plan.component';
import {TimetableComponent} from './components/timetable/timetable.component';
import {FormForCreationComponent} from './components/form-for-creation/form-for-creation.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {CreateOccupationComponent} from './components/create-occupation/create-occupation.component';
import {DeaneryComponent} from './components/deanery/deanery.component';
import {SpecialitiesComponent} from './components/specialities/specialities.component';
import {SubjectsComponent} from './components/subjects/subjects.component';
import {TeachersComponent} from './components/teachers/teachers.component';
import {DeaneryStaffComponent} from './components/deanery-staff/deanery-staff.component';
import {GroupComponent} from './components/group/group.component';
import {FlowComponent} from './components/flow/flow.component';



const routes: Routes = [
  {path: 'lectern/:id/distribution_courses_semesters', component: TimetableComponent},
  {path: 'creation', component: FormForCreationComponent},
  {path: 'lectern/:id/schedule/:idStudyPlan', component: ScheduleComponent},
  {path: 'deanery/:id', component: DeaneryComponent},
  {path: 'deanery/:id/lecterns', component: DeaneryComponent},
  {path: 'deanery/:id/staff', component: DeaneryStaffComponent},
  {path: 'deanery/:id/groups', component: GroupComponent},
  {path: 'deanery/:id/flows/:idLectern', component: FlowComponent},
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
