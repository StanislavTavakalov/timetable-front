import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../../model/employee.model';
import {DeaneryService} from '../../../services/deanery.service';

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
      name: new FormControl(this.employee.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      surname: new FormControl(this.employee.surname, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      patronymic: new FormControl(this.employee.patronymic, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      rank: new FormControl(this.employee.rank, [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
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

  public valuesf(num, event): void {
    if (num === 1) {
      this.employee.name = event.currentTarget.value;
    } else if (num === 2) {
      this.employee.surname = event.currentTarget.value;
    } else if (num === 3) {
      this.employee.patronymic = event.currentTarget.value;
    } else {
      this.employee.rank = event.currentTarget.value;
    }
  }

  public add(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.employee);
    }
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }
}
