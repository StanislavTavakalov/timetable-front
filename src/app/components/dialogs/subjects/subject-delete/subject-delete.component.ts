import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {OperationResponse} from '../../../../model/operation-response.model';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SubjectService} from '../../../../services/lectern/subject.service';

@Component({
  selector: 'app-subject-delete',
  templateUrl: './subject-delete.component.html',
  styleUrls: ['./subject-delete.component.css']
})
export class SubjectDeleteComponent implements OnInit, OnDestroy {

  operationResponse: OperationResponse;
  subjectServiceSubscription: Subscription;
  loading = false;

  constructor(private subjectService: SubjectService,
              private dialogRef: MatDialogRef<SubjectDeleteComponent>,
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
    this.subjectServiceSubscription = this.subjectService.deleteSubject(this.data.subjectId).subscribe(response => {
        this.operationResponse.isOperationCompleted = true;
        this.operationResponse.operationResult = null;
        this.operationResponse.errorMessage = null;
        this.loading = false;
        this.dialogRef.close(this.operationResponse);
      }, error => {
        this.operationResponse.isOperationCompleted = true;
        this.operationResponse.operationResult = null;
        this.operationResponse.errorMessage = 'Удаление шаблона не завершилось. Ошибка на сервере';
        this.dialogRef.close(this.operationResponse);
      }
    );

  }

  ngOnDestroy(): void {
    if (this.subjectServiceSubscription) {
      this.subjectServiceSubscription.unsubscribe();
    }
  }


}
