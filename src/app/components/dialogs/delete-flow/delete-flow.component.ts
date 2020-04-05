import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeaneryService} from '../../../services/deanery.service';
import {DeleteEmployeeComponent} from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-delete-flow',
  templateUrl: './delete-flow.component.html',
  styleUrls: ['./delete-flow.component.css']
})
export class DeleteFlowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private deaneryService: DeaneryService) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.deaneryService.deleteFlow(this.data.flowId).subscribe(flow => {
      this.dialogRef.close(this.data.flowId);
    });
  }

}
