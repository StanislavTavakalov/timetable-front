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
export const SEVERITY_LIST: Severity[] = [{id: 1, name: 'Экзаменов'}, {id: 2, name: 'Зачетов'}, {id: 3, name: 'РГР'}, {
  id: 4,
  name: 'Контрольных'
}, {id: 5, name: 'Аудиторных'}, {id: 6, name: 'Лекций'}, {id: 7, name: 'Лабораторных'}, {id: 8, name: 'Практических'}];


