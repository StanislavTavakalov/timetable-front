import {Component, Inject, OnInit} from '@angular/core';
import {Flow} from '../../../model/flow.model';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeaneryService} from '../../../services/deanery.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../model/group.model';
import {newLineWithIndentation} from 'tslint/lib/utils';

@Component({
  selector: 'app-create-edit-flow',
  templateUrl: './create-edit-flow.component.html',
  styleUrls: ['./create-edit-flow.component.css']
})
export class CreateEditFlowComponent implements OnInit {

  flow: Flow;
  formGroup: any;
  value: string;
  groupsList: Group[];
  newGroups: Group[] = [];

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
      name: new FormControl(this.flow.name, [Validators.required, Validators.maxLength(1000)]),
      description: new FormControl(this.flow.description, [Validators.maxLength(10000)]),
      groups: new FormControl('', [Validators.required]),
    });
    this.deaneryService.getFreeGroupsByDeaneryId(this.data.deaneryId).subscribe(groups => {
      this.groupsList = groups;
      if (this.data.flow !== null) {
        this.groupsList = this.groupsList.concat(this.flow.groups);
      }
    });
  }

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  get groups(): FormControl {
    return this.formGroup.get('groups') as FormControl;
  }

  public valuesf(num, event): void {
    if (num === 1) {
      this.value = event.currentTarget.value;
      this.deaneryService.checkUniqueFlowName(this.value).subscribe(flag => {
        if (!flag) {
          this.formGroup.controls.name.setValue('');
          window.alert('Поток с таким названием уже существует');
        }
      });
    } else if (num === 3) {
      this.newGroups = [];
      event.value.forEach((groupInput) => {
        this.newGroups.push(
          this.groupsList.find((group) => {
            return group.id === groupInput;
          })
        );
      });
      this.flow.groups = this.newGroups;
    }
  }

  public add(): void {
    if (this.formGroup.valid) {
      this.setValuesFromForm();
      this.dialogRef.close(this.flow);
    }
  }

  setValuesFromForm() {
    this.flow.name = this.formGroup.controls.name.value;
    this.flow.description = this.formGroup.controls.description.value;
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }
}
