import {Component, Inject, OnInit} from '@angular/core';
import {DeleteEmployeeComponent} from '../delete-employee/delete-employee.component';
import {DeaneryService} from '../../../services/deanery.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css']
})
export class DeleteGroupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private deaneryService: DeaneryService) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.deaneryService.deleteGroup(this.data.groupId).subscribe(group => {
      this.dialogRef.close(this.data.groupId);
    });
  }

}
