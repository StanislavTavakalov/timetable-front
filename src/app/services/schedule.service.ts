import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Course} from '../model/course.model';
import {COURSES} from '../mock/course-mock';
import {Occupation} from '../model/occupation.model';
import {OCCUPATIONS} from '../mock/occupation-mock';
import {PLANS} from '../mock/plan-mock';
import {StudyPlan} from '../model/study-plan.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(COURSES);
  }

  getOccupations(): Observable<Occupation[]> {
    return of(OCCUPATIONS);
  }

  getOccupationBySymbol(symbol): Observable<Occupation> {
    return of(OCCUPATIONS.find( (occupation) => {
      return occupation.symbol === symbol;
    }));
  }

  getCourseById(id): Observable<Course> {
    return of(COURSES.find((course) => {
      return course.id === id;
    }));
  }

}
