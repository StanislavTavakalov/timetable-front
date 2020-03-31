import { Component, OnInit } from '@angular/core';
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
import {StudyPlan} from '../../model/study-plan.model';
import {WEEKS} from '../../mock/course-mock';
import {LocalStorageService} from '../../services/local-storage.service';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  occupationHoliday: Occupation;
  plan: StudyPlan;
  nameNew: number;
  schedule: Schedule;
  scheduleNew: Schedule = new Schedule();
  course: Course = new Course();
  courseList: Course[] = [];
  occupationCounter: OccupationCounter = new OccupationCounter();
  occupationCounterCourse: OccupationCounterCourse = new OccupationCounterCourse();
  occupationCounterList: OccupationCounter [] = [];
  occupationCounterCourseList: OccupationCounterCourse[] = [] ;
  occupations: Occupation[] = [];
  newOccupation: Occupation;
  oldOccupation: Occupation;
  newOccupationCounter: OccupationCounter = new OccupationCounter();
  newOccupationCounterCourse: OccupationCounterCourse = new OccupationCounterCourse();
  selectedId: string;


  constructor(private localStorageService: LocalStorageService,
              private timetableService: TimetableService,
              private route: ActivatedRoute,
              private scheduleService: ScheduleService,
              private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {

    this.scheduleService.getAuthToken().subscribe(
      (result: any) => {
        this.localStorageService.setCurrentUserToken(result.tokenType + ' ' + result.accessToken);
        this.scheduleService.getOccupations().subscribe(occupation => {
          this.occupations = occupation;
        }, error2 => {
          this.notifierService.notify('error', 'Не удалось загрузить нагузки');
        });
        this.selectedId = this.route.snapshot.paramMap.get('idStudyPlan');
        if (this.selectedId === null) {
        } else {
          this.timetableService.getPlanById(this.selectedId).subscribe(stydyplan => {
            this.plan = stydyplan;
            this.schedule = stydyplan.schedules[0];
          }, error2 => {
            this.notifierService.notify('error', 'Не удалось загрузить учебный план');
          });
        }
      }
    );
  }

  saveSchedule() {
     this.timetableService.editPlan(this.plan).subscribe();
  }

  addOccupation() {
    const dialogRef = this.dialog.open(CreateOccupationComponent, {
      width: '30%',
      height: '80%',
      data: {message: 'Создать новый тип нарузки'},
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
        console.log(this.schedule);
        this.scheduleService.saveSchedule(this.schedule).subscribe(sc => {
          this.schedule = sc;
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
    this.scheduleService.getOccupationBySymbol(target.target.value).subscribe( occupation => {
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
    if (this.plan.schedules === null) {
      this.plan.schedules = [];
    }
    if (this.plan.schedules.length === 0) {
      this.course.name = '1';
      this.scheduleNew.courses = this.courseList;
      this.scheduleNew.courses.push(JSON.parse(JSON.stringify(this.course)));
      this.scheduleNew.countOccupation = JSON.parse(JSON.stringify(this.occupationCounterList));
      this.schedule = JSON.parse(JSON.stringify(this.scheduleNew));
      this.plan.schedules.push(this.schedule);
    } else {
      this.nameNew = parseInt(this.schedule.courses[this.schedule.courses.length - 1].name) + 1;
      this.course.name = this.nameNew + '';
      this.schedule.countOccupation.forEach((count) => {
        if (count.occupation.symbol === ' ') {
          count.count = count.count + 52;
        }
      });
      this.schedule.courses.push(JSON.parse(JSON.stringify(this.course)));
      this.plan.schedules[0] = this.schedule;
    }
    this.timetableService.editPlan(this.plan).subscribe(plan => {
      this.timetableService.getPlanById(this.selectedId).subscribe(stydyplan => {
        this.plan = stydyplan;
        this.schedule = stydyplan.schedules[0];
      });
    });
  }
}
