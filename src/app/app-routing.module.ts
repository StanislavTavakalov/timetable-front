import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudyPlanComponent} from './components/study-plan/study-plan.component';
import {TestComponent} from './components/test/test.component';
import { TimetableComponent} from './components/timetable/timetable.component';
import { EditableModeComponent} from './components/editable-mode/editable-mode.component';
import { FormForCreationComponent} from './components/form-for-creation/form-for-creation.component';



const routes: Routes = [
  { path: 'study-plan', component: StudyPlanComponent },
  { path: 'test', component: TestComponent },

  { path: 'timetable/:id', component: TimetableComponent },
  { path: 'creation', component: FormForCreationComponent },
  { path: 'edit', component: EditableModeComponent },
  { path: '**', redirectTo: 'study-plan' }

  // { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
