﻿import { Component, OnInit } from '@angular/core';
import {Course} from '../../model/course.model';
import {ScheduleService} from '../../services/schedule.service';
import {Occupation} from '../../model/occupation.model';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material';
import {CreateOccupationComponent} from '../create-occupation/create-occupation.component';
import {Schedule} from '../../model/shedule.model';
import {OccupationCounter} from '../../model/occupatoionCounter.model';
import {OccupationCounterCourse} from '../../model/occupationCounterCourse.model';
import {ActivatedRoute} from '@angular/router';
import {TimetableService} from '../../services/timetable.service';
import {WEEKS} from '../../mock/course-mock';
import {LocalStorageService} from '../../services/local-storage.service';
import {NotifierService} from 'angular-notifier';
import {DeleteComponent} from '../dialogs/delete/delete.component';
import {HeaderType} from '../../model/header-type';
import {LecternService} from '../../services/lectern/lectern.service';
import {Role} from '../../model/role.model';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  occupationHoliday: Occupation;
  nameNew: number;
  schedule: Schedule;
  scheduleNew: Schedule = new Schedule();
  course: Course = new Course();
  occupationCounter: OccupationCounter = new OccupationCounter();
  occupationCounterCourse: OccupationCounterCourse = new OccupationCounterCourse();
  occupationCounterList: OccupationCounter [] = [];
  occupationCounterCourseList: OccupationCounterCourse[] = [] ;
  occupations: Occupation[] = [];
  newOccupation: Occupation;
  oldOccupation: Occupation;
  newOccupationCounter: OccupationCounter = new OccupationCounter();
  newOccupationCounterCourse: OccupationCounterCourse = new OccupationCounterCourse();
  studyPlanId: string;
  occupationsOld: Occupation [] = [];
  flag: number;
  lecternId: string;


  constructor(private localStorageService: LocalStorageService,
              private timetableService: TimetableService,
              private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private dialog: MatDialog,
              private overlay: Overlay,
              private lecternService: LecternService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.scheduleService.getOccupations().subscribe(occupation => {
      this.occupations = occupation;
      }, error2 => {
      this.notifierService.notify('error', 'Не удалось загрузить нагузки');
    });
    this.lecternId = this.route.snapshot.paramMap.get('id');
    this.localStorageService.observableHeaderType.next(HeaderType.LECTERN);
    // loading of Lectern if it is null or id changed
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== this.lecternId) {
      this.lecternService.getLecternById(this.lecternId).subscribe(value => {
        this.localStorageService.observableLectern.next(value);
        }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить кафедру.');
      });
    }
    this.studyPlanId = this.route.snapshot.paramMap.get('idStudyPlan');
    if (this.studyPlanId !== null) {
      this.scheduleService.getShedule(this.studyPlanId).subscribe(schedules => {
        this.schedule = schedules[0];
        if (schedules.length !== 0) {
          this.schedule.courses.forEach((course) => {
            course.weeks.sort((a, b) => a.position - b.position);
            });
          this.recalculateCounters();
        }
        }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить учебный план');
      });
    }
  }

  saveSchedule() {
     this.scheduleService.saveSchedule(this.schedule).subscribe( schedule => {
       this.notifierService.notify('success', 'Расписание успешно сохранено');
     }
     );
  }

  addOccupation() {
    const dialogRef = this.dialog.open(CreateOccupationComponent, {
      width: '40%',
      height: '35%',
      data: {},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.occupations.push(result);
        this.newOccupationCounter.count = 0;
        this.newOccupationCounter.occupation = result;
        this.schedule.courses.forEach((course) => {
          this.newOccupationCounterCourse.count = 0;
          this.newOccupationCounterCourse.occupation = result;
          course.countOccupation.push(this.newOccupationCounterCourse);
        });
        this.schedule.countOccupation.push(this.newOccupationCounter);
        this.scheduleService.saveSchedule(this.schedule).subscribe(sc => {
          this.schedule = sc;
          this.schedule.courses.forEach((course) => {
            course.weeks.sort((a, b) => a.position - b.position);
          });
        });
        this.notifierService.notify('success', 'Нагрузка была успешна добавлена');
      }
    });
  }

  changeOccupation(idCourse, idWeek, target) {
    this.oldOccupation = JSON.parse(JSON.stringify(this.schedule.courses.find( (course) => {
       return course.id === idCourse;
    }).weeks.find(week => {
       return week.id === idWeek;
    }).occupation));
    this.scheduleService.getOccupationById(target.target.value).subscribe( occupation => {
     this.newOccupation = occupation;
     this.schedule.courses.find( (course) => {
        return course.id === idCourse;
      }).weeks.find(week => {
        return week.id === idWeek;
      }).occupation = this.newOccupation;
     this.schedule.courses.find( (course) => {
       return course.id === idCourse;
    }).countOccupation[this.occupations.findIndex(x => x.id === this.oldOccupation.id)].count -= 1;
     this.schedule.courses.find( (course) => {
       return course.id === idCourse;
    }).countOccupation[this.occupations.findIndex(x => x.id === occupation.id)].count += 1;
     this.schedule.countOccupation[this.occupations.findIndex(x => x.id === this.oldOccupation.id)].count -= 1;
     this.schedule.countOccupation[this.occupations.findIndex(x => x.id === occupation.id)].count += 1;
    });
  }

  addCourse() {
    this.occupationCounterList = [];
    this.occupationCounterCourseList = [];
    this.occupations.forEach((occupation) => {
      if (occupation.symbol === ' ') {
        this.occupationHoliday = occupation;
        this.occupationCounter.count = 52;
        this.occupationCounter.occupation = occupation;
        this.occupationCounterList.push(JSON.parse(JSON.stringify(this.occupationCounter)));
        this.occupationCounterCourse.count = 52;
        this.occupationCounterCourse.occupation = occupation;
        this.occupationCounterCourseList.push(JSON.parse(JSON.stringify(this.occupationCounterCourse)));
      } else {
        this.occupationCounter.count = 0;
        this.occupationCounter.occupation = occupation;
        this.occupationCounterList.push(JSON.parse(JSON.stringify(this.occupationCounter)));
        this.occupationCounterCourse.count = 0;
        this.occupationCounterCourse.occupation = occupation;
        this.occupationCounterCourseList.push(JSON.parse(JSON.stringify(this.occupationCounterCourse)));
      }
    });

    this.course.countOccupation = JSON.parse(JSON.stringify(this.occupationCounterCourseList));
    this.course.weeks = JSON.parse(JSON.stringify(WEEKS));
    this.course.weeks.forEach((week) => {
      week.occupation = this.occupationHoliday;
    });
    this.course.total = 52;
    console.log(this.course);
    if (this.schedule === undefined) {
      this.scheduleNew = new Schedule();
      this.scheduleService.addSchedule(this.scheduleNew, this.studyPlanId).subscribe(schedule => {
        this.course.name = '1';
        schedule.courses = [];
        schedule.courses.push(JSON.parse(JSON.stringify(this.course)));
        schedule.countOccupation = JSON.parse(JSON.stringify(this.occupationCounterList));
        this.scheduleService.saveSchedule(schedule).subscribe( scheduleNew => {
          this.schedule = scheduleNew;
          this.notifierService.notify('success', 'Курс успешно добавлен');
        });
      });
    } else {
      this.nameNew = parseInt(this.schedule.courses[this.schedule.courses.length - 1].name) + 1;
      this.course.name = this.nameNew + '';
      this.schedule.countOccupation.forEach((count) => {
        if (count.occupation.symbol === ' ') {
          count.count = count.count + 52;
        }
      });
      this.schedule.courses.push(JSON.parse(JSON.stringify(this.course)));
      this.scheduleService.saveSchedule(this.schedule).subscribe(schedule => {
        this.schedule = schedule;
        this.notifierService.notify('success', 'Курс успешно добавлен');
      });
    }
  }

  recalculateCounters() {
    let change = 0;
    this.schedule.countOccupation.forEach((counter) => {
      this.occupationsOld.push(counter.occupation);
    });
    this.occupations.forEach((occupation) => {
      this.flag = 0;
      this.occupationsOld.forEach((occu) => {
        if (occu.id === occupation.id) {
          this.flag = 1;
        }
      });
      if (this.flag === 0 ) {
        change = 1;
        this.occupationCounter.occupation = occupation;
        this.occupationCounter.count = 0;
        this.schedule.countOccupation.push(JSON.parse(JSON.stringify(this.occupationCounter)));
        this.schedule.courses.forEach((course) => {
          this.occupationCounterCourse.count = 0;
          this.occupationCounterCourse.occupation = occupation;
          course.countOccupation.push(JSON.parse(JSON.stringify(this.occupationCounterCourse)));
        });
      }
    });
    if (change === 1) {
      this.scheduleService.saveSchedule(this.schedule).subscribe( schedule => {
        this.schedule = schedule;
      });
    }
  }

  public deleteCourse() {
    const courseO = this.schedule.courses[this.schedule.courses.length - 1];
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '25%',
      height: '25%',
      data: {},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.scheduleService.deleteCourse(courseO.id).subscribe(course => {
            if (this.schedule.courses.length > 1) {
              this.schedule.courses.splice(this.schedule.courses.indexOf(courseO, 1));
              courseO.countOccupation.forEach((count) => {
                this.schedule.countOccupation.forEach((countS) => {
                  if (count.occupation.id === countS.occupation.id) {
                    countS.count = countS.count - count.count;
                  }
                });
              });
              this.scheduleService.saveSchedule(this.schedule).subscribe();
              this.notifierService.notify('success', 'Курс успешно удален');
            } else {
              this.scheduleService.deleteSchedule(this.schedule.id).subscribe(schedue => {
                this.schedule = undefined;
                this.notifierService.notify('success', 'Курс успешно удален');
              });
            }
          });
        }
      }
    });
  }

  isDeleteEditAddStudyPlanEnabled() {
    const userRoles = this.localStorageService.getCurrentUser().userRoles.map(userRole => userRole.role);
    return userRoles.includes(Role.ROLE_ADMIN) || userRoles.includes(Role.ROLE_LECTERN_METHODIST) || userRoles.includes(Role.ROLE_LECTERN);
  }
}
