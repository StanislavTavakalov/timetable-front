import {Component, Inject, OnInit} from '@angular/core';
import {Lectern} from '../../../model/lectern.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LecternService} from '../../../services/lectern/lectern.service';


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
              private lecternService: LecternService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    if (this.data.lectern != null) {
      this.lectern = this.data.lectern;
    } else {
      this.lectern = new Lectern();
    }
    this.formGroup = new FormGroup({
      name: new FormControl(this.lectern.name, [Validators.required, Validators.maxLength(255)]),
      fullname: new FormControl(this.lectern.fullname, [Validators.required, Validators.maxLength(1000)]),
      description: new FormControl(this.lectern.description, [Validators.maxLength(10000)])
    });
  }

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get fullname(): FormControl {
    return this.formGroup.get('fullname') as FormControl;
  }

  get description(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  public valuesf(num, event): void {
    if (num === 1) {
      this.value = event.currentTarget.value;
      this.lecternService.checkUniqueLectern('name', this.value).subscribe( flag => {
        if (!flag) {
          this.formGroup.controls.name.setValue('');
          window.alert('Кафедра с таким название уже существует');
        }
      });
    } else if (num === 2) {
      this.value = event.currentTarget.value;
      this.lecternService.checkUniqueLectern('fullname', this.value).subscribe( flag => {
        if (!flag) {
          this.formGroup.controls.fullname.setValue('');
          window.alert('Кафедра с таким полным названием уже существует');
        }
      });
    }
  }

  public add(): void {
      this.setValuesFromForm();
      this.dialogRef.close(this.lectern);
  }
  onCancelClick() {
    this.dialogRef.close(null);
  }

  setValuesFromForm() {
    this.lectern.name = this.formGroup.controls.name.value;
    this.lectern.fullname = this.formGroup.controls.fullname.value;
    this.lectern.description = this.formGroup.controls.description.value;
  }
}
