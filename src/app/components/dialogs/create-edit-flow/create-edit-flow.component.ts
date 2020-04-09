import {Component, Inject, OnInit} from '@angular/core';
import {Flow} from '../../../model/flow.model';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeaneryService} from '../../../services/deanery.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-edit-flow',
  templateUrl: './create-edit-flow.component.html',
  styleUrls: ['./create-edit-flow.component.css']
})
export class CreateEditFlowComponent implements OnInit {

  flow: Flow;
  formGroup: any;
  value: string;

  constructor(public dialogRef: MatDialogRef<CreateEmployeeComponent>,
              private deaneryService: DeaneryService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    if (this.data.flow === null) {
      this.flow = new Flow();
    } else {
      this.flow = this.data.flow;
    }
    this.formGroup = new FormGroup({
      name: new FormControl(this.flow.name, [Validators.required, Validators.maxLength(25)]),
      description: new FormControl(this.flow.description, [Validators.required, Validators.maxLength(255)]),
    });
  }

  public valuesf(num, event): void {
    if (num === 1) {
      this.value = event.currentTarget.value;
      this.deaneryService.checkUniqueFlowName(this.value).subscribe(flag => {
        if (flag) {
          this.flow.name = this.value;
        } else {
          this.formGroup.controls.name.setValue('');
          window.alert('Поток с таким названием уже существует');
        }
      });
    } else {
      this.flow.description = event.currentTarget.value;
    }
  }

  public add(): void {
    if (this.formGroup.valid) {
      if (this.data.flow != null) {
        this.deaneryService.editFlow(this.flow).subscribe( flow => {
          this.dialogRef.close(flow);
        });
      } else {
        this.deaneryService.addFlow(this.flow, this.data.lecternId).subscribe( flow => {
          this.dialogRef.close(flow);
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
