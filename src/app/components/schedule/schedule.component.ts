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

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule: Schedule;
  occupations: Occupation[] = [];
  newOccupation: Occupation;
  oldOccupation: Occupation;
  curCourse: Course;
  newOccupationCounter: OccupationCounter = new OccupationCounter();
  newOccupationCounterCourse: OccupationCounterCourse = new OccupationCounterCourse();
  new1: OccupationCounter;
  new2: OccupationCounterCourse;


  constructor(private scheduleService: ScheduleService, private dialog: MatDialog, private overlay: Overlay) { }

  ngOnInit() {

    this.scheduleService.getOccupations().subscribe(occupation => {
      this.occupations = occupation;
    });
    this.scheduleService.getShedule().subscribe(schedule => {
      this.schedule = schedule[0];
    });
  }

  saveSchedule() {
     this.scheduleService.saveSchedule(this.schedule).subscribe();
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
      this.scheduleService.saveSchedule(this.schedule).subscribe(sc => {
			this.scheduleService.getShedule().subscribe(schedule => {
			this.schedule = schedule[0];
			});
		});
      }
    });
  }

  changeOccupation(idCourse, idWeek, target) {
    this.oldOccupation = JSON.parse(JSON.stringify(this.schedule.courses.find( (course) => {
       return course.id === parseInt(idCourse, 10);
    }).weeks.find(week => {
       return week.id === parseInt(idWeek, 10);
    }).occupation));
    this.scheduleService.getOccupationBySymbol(target.target.value).subscribe( occupation => {
     this.newOccupation = occupation;
     this.schedule.courses.find( (course) => {
        return course.id === parseInt(idCourse, 10);
      }).weeks.find(week => {
        return week.id === parseInt(idWeek, 10);
      }).occupation = this.newOccupation;
     this.schedule.courses.find( (course) => {
       return course.id === parseInt(idCourse, 10);
    }).countOccupation[this.occupations.findIndex(x => x.id === this.oldOccupation.id)].count -= 1;
     this.schedule.courses.find( (course) => {
       return course.id === parseInt(idCourse, 10);
    }).countOccupation[this.occupations.findIndex(x => x.id === occupation.id)].count += 1;
     this.schedule.countOccupation[this.occupations.findIndex(x => x.id === this.oldOccupation.id)].count -= 1;
     this.schedule.countOccupation[this.occupations.findIndex(x => x.id === occupation.id)].count += 1;
    });
  }

}
