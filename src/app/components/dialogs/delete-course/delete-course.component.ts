import {Component, Inject, OnInit} from '@angular/core';
import {DeleteEmployeeComponent} from '../delete-employee/delete-employee.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ScheduleService} from '../../../services/schedule.service';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private scheduleService: ScheduleService) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.scheduleService.deleteCourse(this.data.course).subscribe(course => {
      this.dialogRef.close(this.data.course);
    });
  }

}
