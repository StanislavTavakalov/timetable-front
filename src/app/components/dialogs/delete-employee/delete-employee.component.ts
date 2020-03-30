import {Component, Inject, OnInit} from '@angular/core';
import {DeaneryService} from '../../../services/deanery.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private deaneryService: DeaneryService) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.deaneryService.deleteEmployee(this.data.employee).subscribe(lectern => {
      this.dialogRef.close();
    });
  }
}
