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
  value: string;

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
      name: new FormControl(this.lectern.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      fullname: new FormControl(this.lectern.fullname, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      description: new FormControl(this.lectern.description, [Validators.required, Validators.minLength(3), Validators.maxLength(255)])
    });
  }


  public valuesf(num, event): void {
    if (num === 1) {
      this.value = event.currentTarget.value;
      this.deaneryService.checkUniqueLectern('name', this.value).subscribe( flag => {
        if (flag) {
          this.lectern.name = this.value;
        } else {
          this.formGroup.controls.name.setValue('');
          window.alert('Кафедра с таким название уже существует');
        }
      });
    } else if (num === 2) {
      this.value = event.currentTarget.value;
      this.deaneryService.checkUniqueLectern('fullname', this.value).subscribe( flag => {
        if (flag) {
          this.lectern.fullname = this.value;
        } else {
          this.formGroup.controls.fullname.setValue('');
          window.alert('Кафедра с таким полным названием уже существует');
        }
      });
    } else {
      this.lectern.description = event.currentTarget.value;
    }
  }

  public add(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.lectern);
    } else {
      window.alert('Заполните обязательные поля в корректном формате');
    }
  }
  onCancelClick() {
    this.dialogRef.close(null);
  }
}
