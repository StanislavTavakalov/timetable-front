import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../../model/employee.model';
import {DeaneryService} from '../../../services/deanery/deanery.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>,
              private deaneryService: DeaneryService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }
  formGroup: any;
  employee: Employee;

  ngOnInit() {
    if (this.data.employee != null) {
      this.employee = this.data.employee;
    } else {
      this.employee = new Employee();
    }
    this.formGroup = new FormGroup({
      name: new FormControl(this.employee.name, [Validators.required, Validators.maxLength(1000)]),
      surname: new FormControl(this.employee.surname, [Validators.required, Validators.maxLength(1000)]),
      patronymic: new FormControl(this.employee.patronymic, [Validators.required, Validators.maxLength(1000)]),
      rank: new FormControl(this.employee.rank, [Validators.required, Validators.maxLength(1000)])
    });
  }

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get surname(): FormControl {
    return this.formGroup.get('surname') as FormControl;
  }

  get patronymic(): FormControl {
    return this.formGroup.get('patronymic') as FormControl;
  }

  get rank(): FormControl {
    return this.formGroup.get('rank') as FormControl;
  }

  public add(): void {
    if (this.formGroup.valid) {
      this.setValuesFromForm();
      this.dialogRef.close(this.employee);
    }
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }

  setValuesFromForm() {
    this.employee.name = this.formGroup.controls.name.value;
    this.employee.surname = this.formGroup.controls.surname.value;
    this.employee.patronymic = this.formGroup.controls.patronymic.value;
    this.employee.rank = this.formGroup.controls.rank.value;
  }
}
