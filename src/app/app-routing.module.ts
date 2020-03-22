import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPlanComponent} from './components/study-plan/study-plan.component';
import {TimetableComponent} from './components/timetable/timetable.component';
import {EditableModeComponent} from './components/editable-mode/editable-mode.component';
import {FormForCreationComponent} from './components/form-for-creation/form-for-creation.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {CreateOccupationComponent} from './components/create-occupation/create-occupation.component';


const routes: Routes = [
  {path: 'study-plan', component: StudyPlanComponent},
  {path: 'timetable/:id', component: TimetableComponent},
  {path: 'creation', component: FormForCreationComponent},
  {path: 'timetable', component: TimetableComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'schedule/:id', component: ScheduleComponent},
  {path: 'edit', component: EditableModeComponent},
  {path: 'edit1', component: CreateOccupationComponent},
  {path: 'lectern/:id', component: StudyPlanComponent},
  {path: '**', redirectTo: 'study-plan'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
