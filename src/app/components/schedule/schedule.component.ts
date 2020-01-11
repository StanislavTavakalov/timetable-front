import { Component, OnInit } from '@angular/core';
import {Course} from '../../model/course.model';
import {COURSES} from '../../mock/course-mock';
import {ScheduleService} from '../../services/schedule.service';
import {Occupation} from '../../model/occupation.model';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material';
import {FormForCreationComponent} from '../form-for-creation/form-for-creation.component';
import {CreateOccupationComponent} from '../create-occupation/create-occupation.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  courses: Course[] = [];
  occupations: Occupation[] = [];
  newOccupation: Occupation;

  constructor(private scheduleService: ScheduleService, private dialog: MatDialog, private overlay: Overlay) { }

  ngOnInit() {
    this.scheduleService.getOccupations().subscribe(occupation => {
      this.occupations = occupation;
    });
    this.scheduleService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
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
      }

    });
  }

  changeOccupation(idCourse, idWeek, target) {
    this.scheduleService.getOccupationBySymbol(target.target.value).subscribe( occupation => {
     this.newOccupation = occupation;
     this.courses.find( (course) => {
        return course.id === parseInt(idCourse, 10);
      }).weeks.find(week => {
        return week.id === parseInt(idWeek, 10);
      }).occupation = this.newOccupation;
    });
  }

}
