import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {OperationResponse} from '../../../../model/operation-response.model';
import {Subscription} from 'rxjs';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TeacherService} from '../../../../services/lectern/teacher.service';

@Component({
  selector: 'app-teacher-delete',
  templateUrl: './teacher-delete.component.html',
  styleUrls: ['./teacher-delete.component.css']
})
export class TeacherDeleteComponent implements OnInit, OnDestroy {

  operationResponse: OperationResponse;
  teacherServiceSubscription: Subscription;
  loading = false;

  constructor(private teacherService: TeacherService,
              private dialogRef: MatDialogRef<TeacherDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.operationResponse = new OperationResponse();
  }


  onCancelClick() {
    this.operationResponse.isOperationCompleted = false;
    this.operationResponse.operationResult = null;
    this.operationResponse.errorMessage = null;
    this.dialogRef.close(this.operationResponse);
  }

  onConfirmClick() {
    this.loading = true;
    this.teacherServiceSubscription = this.teacherService.deleteTeacher(this.data.teacherId).subscribe(response => {
        this.operationResponse.isOperationCompleted = true;
        this.operationResponse.operationResult = null;
        this.operationResponse.errorMessage = null;
        this.loading = false;
        this.dialogRef.close(this.operationResponse);
      }, error => {
        this.operationResponse.isOperationCompleted = true;
        this.operationResponse.operationResult = null;
        this.operationResponse.errorMessage = 'Удаление не завершилось. Ошибка на сервере';
        this.dialogRef.close(this.operationResponse);
      }
    );

  }

  ngOnDestroy(): void {
    if (this.teacherServiceSubscription) {
      this.teacherServiceSubscription.unsubscribe();
    }
  }

}
