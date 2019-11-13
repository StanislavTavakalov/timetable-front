import {StudyPlan} from '../model/study-plan.model';
import {SUBJECTS, SUBJECTS1} from './study-mock';

export const PLANS: StudyPlan[] = [{
  id: 1, name: 'Учебный план 1', countOfSem: 8,
  weeks: [15, 12, 12, 12, 12, 12, 12, 12], subjects: SUBJECTS, coefficient: 3, isChanged: false
}, {
  id: 2, name: 'Учебный план 2', countOfSem: 6,
  weeks: [153, 123, 123, 123, 123, 123, 123, 123], subjects: SUBJECTS1, coefficient: 2, isChanged: false
}];
