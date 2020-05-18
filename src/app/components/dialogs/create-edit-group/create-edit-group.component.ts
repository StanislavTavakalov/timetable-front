import {Component, Inject, OnInit} from '@angular/core';
import {SpecialityService} from '../../../services/lectern/speciality.service';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';
import {DeaneryService} from '../../../services/deanery.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Speciality} from '../../../model/speciality.model';
import {Group} from '../../../model/group.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Flow} from '../../../model/flow.model';
import {Lectern} from '../../../model/lectern.model';

@Component({
  selector: 'app-create-edit-group',
  templateUrl: './create-edit-group.component.html',
  styleUrls: ['./create-edit-group.component.css']
})
export class CreateEditGroupComponent implements OnInit {

  specialities: Speciality[] = [];
  lecterns: Lectern[] = [];
  formGroup: any;
  group: Group;
  specialityO: Speciality;
  value: string;

  constructor(public specialityService: SpecialityService,
              public dialogRef: MatDialogRef<CreateEmployeeComponent>,
              private deaneryService: DeaneryService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    if (this.data.group === null) {
      this.deaneryService.getLecterns(this.data.deaneryId).subscribe(lecterns => {
        this.lecterns = lecterns;
      });
      this.group = new Group();
    } else {
      this.lecterns.push(this.data.group.flow.lectern);
      this.specialityService.getSpecialities(this.data.group.flow.lectern.id).subscribe(specialities => {
        this.specialities = specialities;
      });
      this.group = this.data.group;
      this.specialityO = this.group.speciality;
    }
    this.createFormGroup();
  }

  public valuesf(num, event): void {
    if (num === 1) {
      this.value = event.currentTarget.value;
      this.deaneryService.checkUniqueGroupName(this.value).subscribe(flag => {
        if (flag) {
          this.group.name = this.value;
        } else {
          this.formGroup.controls.name.setValue('');
          window.alert('Группа с таким названием уже существует');
        }
      });
    } else if (num === 2) {
      this.group.description = event.currentTarget.value;
    } else if (num === 3) {
      this.group.countOfStudents = parseInt(event.currentTarget.value, 10);
    } else if (num === 4) {
      this.specialityService.getSpecialities(event.value).subscribe(specialities => {
        this.specialities = specialities;
      });
    } else if (num === 6) {
      this.specialityService.getSpecialityById(event.value).subscribe(speciality => {
        this.group.speciality = speciality;
      });
    }
  }

  public add(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close( this.group);
    }
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl(this.group.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      description: new FormControl(this.group.description, [Validators.maxLength(255)]),
      count: new FormControl(this.group.countOfStudents, [Validators.required, Validators.min(3), Validators.max(40), Validators.pattern('[0-9]{1,2}')]),
      specialitiesF: new FormControl('', [Validators.required]),
      lecternsF: new FormControl('', [Validators.required])});
  }

  get name(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.formGroup.get('description') as FormControl;
  }

  get count(): FormControl {
    return this.formGroup.get('count') as FormControl;
  }

  get specialitiesF(): FormControl {
    return this.formGroup.get('specialitiesF') as FormControl;
  }

  get lecternsF(): FormControl {
    return this.formGroup.get('lecternsF') as FormControl;
  }
}
