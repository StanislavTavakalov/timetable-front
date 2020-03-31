import {Component, Inject, OnInit} from '@angular/core';
import {Lectern} from '../../../model/lectern.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeaneryService} from '../../../services/deanery.service';

@Component({
  selector: 'app-create-lectern',
  templateUrl: './create-lectern.component.html',
  styleUrls: ['./create-lectern.component.css']
})
export class CreateLecternComponent implements OnInit {
  lectern: Lectern;
  formGroup: any;

  constructor(public dialogRef: MatDialogRef<CreateLecternComponent>,
              private deaneryService: DeaneryService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    if (this.data.lectern != null) {
      this.lectern = this.data.lectern;
    } else {
      this.lectern = new Lectern();
    }
    this.formGroup = new FormGroup({
      name: new FormControl(this.lectern.name, [Validators.required]),
      fullname: new FormControl(this.lectern.fullname, [Validators.required]),
      description: new FormControl(this.lectern.description, [Validators.required])
    });
  }


  public valuesf(num, event): void {
    if (num === 1) {
      this.lectern.name = event.currentTarget.value;
    } else if (num === 2) {
      this.lectern.fullname = event.currentTarget.value;
    } else {
      this.lectern.description = event.currentTarget.value;
    }
  }

  public add(): void {
    if (this.formGroup.valid) {
      if (this.data.lectern != null) {
        this.deaneryService.editLectern(this.lectern).subscribe(lectern => {
          this.dialogRef.close(lectern);
        });
      } else {
        this.deaneryService.addLectern(this.lectern, this.data.deaneryId).subscribe(lectern => {
          this.dialogRef.close(lectern);
        });
      }
    } else {
      window.alert('Заполните обязательные поля');
    }
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
