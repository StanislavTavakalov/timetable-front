import {Severity} from '../model/severity.model';

export const SEVERITY_EXAM: Severity = {
  id: 1,
  name: 'Практических'
};

export const SEVERITY_LABS: Severity = {
  id: 2,
  name: 'Лабораторных'
};

// ['name', 'exams', 'offset', 'rgr', 'control-tasks',
//   'auditory-lessons', 'lectures', 'lab-tasks', 'practical-tasks'];
export const SEVERITY_LIST: Severity[] = [{
  id: 1,
  name: 'Контрольных'
}, {id: 2, name: 'Аудиторных'}, {id: 3, name: 'Лекций'}, {id: 4, name: 'Лабораторных'}, {id: 5, name: 'Практических'}];


