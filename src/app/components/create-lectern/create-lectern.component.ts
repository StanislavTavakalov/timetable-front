import {Component, Inject, OnInit} from '@angular/core';
import {Lectern} from '../../model/lectern.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-lectern',
  templateUrl: './create-lectern.component.html',
  styleUrls: ['./create-lectern.component.css']
})
export class CreateLecternComponent implements OnInit {
  lectern: Lectern = new Lectern();
  formGroup: any;

  constructor(public dialogRef: MatDialogRef<CreateLecternComponent>) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      fullname: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
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
      this.dialogRef.close(this.lectern);
    } else {
      window.alert('Заполните обязательные поля');
    }
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
