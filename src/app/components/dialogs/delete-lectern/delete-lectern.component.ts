import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeaneryService} from '../../../services/deanery.service';

@Component({
  selector: 'app-delete-lectern',
  templateUrl: './delete-lectern.component.html',
  styleUrls: ['./delete-lectern.component.css']
})
export class DeleteLecternComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteLecternComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private deaneryService: DeaneryService) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.deaneryService.deleteLectern(this.data.lectern).subscribe(lectern => {
      this.dialogRef.close();
    });
  }
}
