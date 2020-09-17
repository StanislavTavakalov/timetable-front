import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SpecialityService} from '../../../../services/lectern/speciality.service';
import {OperationResponse} from '../../../../model/operation-response.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-speciality-delete',
  templateUrl: './speciality-delete.component.html',
  styleUrls: ['./speciality-delete.component.css']
})
export class SpecialityDeleteComponent implements OnInit, OnDestroy {

  operationResponse: OperationResponse;
  specialityServiceSubscription: Subscription;
  loading = false;

  constructor(private specialityService: SpecialityService,
              private dialogRef: MatDialogRef<SpecialityDeleteComponent>,
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
    this.specialityServiceSubscription = this.specialityService.deleteSpeciality(this.data.specialityId).subscribe(response => {
        this.operationResponse.isOperationCompleted = true;
        this.operationResponse.operationResult = null;
        this.operationResponse.errorMessage = null;
        this.loading = false;
        this.dialogRef.close(this.operationResponse);
      }, error => {
        console.log('ERRROR');
        this.operationResponse.isOperationCompleted = true;
        this.operationResponse.operationResult = null;
        this.operationResponse.errorMessage = 'Ошибка на сервере';
        this.dialogRef.close(this.operationResponse);
      }
    );

  }

  ngOnDestroy(): void {
    if (this.specialityServiceSubscription) {
      this.specialityServiceSubscription.unsubscribe();
    }
  }
}

