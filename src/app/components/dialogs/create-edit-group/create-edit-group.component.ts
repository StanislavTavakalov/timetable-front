import {Component, Inject, OnInit} from '@angular/core';
import {SpecialityService} from '../../../services/lectern/speciality.service';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';
import {DeaneryService} from '../../../services/deanery.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Speciality} from '../../../model/speciality.model';
import {Group} from '../../../model/group.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Flow} from '../../../model/flow.model';

@Component({
  selector: 'app-create-edit-group',
  templateUrl: './create-edit-group.component.html',
  styleUrls: ['./create-edit-group.component.css']
})
export class CreateEditGroupComponent implements OnInit {

  specialities: Speciality[] = [];
  formGroup: any;
  group: Group;
  specialityO: Speciality;

  constructor(public specialityService: SpecialityService,
              public dialogRef: MatDialogRef<CreateEmployeeComponent>,
              private deaneryService: DeaneryService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.specialityService.getSpecialities(this.data.lecternId).subscribe(specialities => {
      this.specialities = specialities;
    });
    if (this.data.group === null) {
      this.group = new Group();
    } else {
      this.group = this.data.group;
      this.specialityO = this.group.speciality;
    }
    this.createFormGroup();
  }

  public valuesf(num, event): void {
    if (num === 1) {
      this.group.name = event.currentTarget.value;
    } else if (num === 2) {
      this.group.description = event.currentTarget.value;
    } else if (num === 3) {
      this.group.countOfStudents = parseInt(event.currentTarget.value, 10);
    } else {
      this.specialityService.getSpecialityById(event.value).subscribe(speciality => {
        this.group.speciality = speciality;
      });
    }
  }

  public add(): void {
    console.log(this.group);
    if (this.formGroup.valid) {
      if (this.data.group != null) {
        this.deaneryService.editGroup(this.group).subscribe( group => {
          this.dialogRef.close(group);
        });
      } else {
        this.deaneryService.addGroup(this.group, this.data.flowId).subscribe( group => {
          this.dialogRef.close(group);
        });
      }
    } else {
      window.alert('Заполните обязательные поля');
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.group.name, [Validators.required, Validators.maxLength(25)]),
      description: new FormControl(this.group.description, [Validators.required, Validators.maxLength(255)]),
      count: new FormControl(this.group.countOfStudents, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]),
      specialities: new FormControl('', [Validators.required])});
    if (this.data.group === null) {
      this.formGroup.addControl('specialities', new FormControl('', [Validators.required]));
    } else {
      this.formGroup.addControl('specialities', new FormControl(this.group.speciality.name, [Validators.required]));
    }
  }
}
