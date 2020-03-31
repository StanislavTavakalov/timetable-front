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
      name: new FormControl(this.employee.name, [Validators.required]),
      surname: new FormControl(this.employee.surname, [Validators.required]),
      patronymic: new FormControl(this.employee.patronymic, [Validators.required]),
      rank: new FormControl(this.employee.rank, [Validators.required])
    });
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
      if (this.data.employee != null) {
        this.deaneryService.editEmployee(this.employee).subscribe( employee => {
          this.dialogRef.close(employee);
        });
      } else {
        this.deaneryService.addEmployee(this.employee, this.data.deaneryId).subscribe( employee => {
          this.dialogRef.close(employee);
        });
      }
    } else {
      window.alert('Заполните обязательные поля');
    }
  }
}
