import {Component, Inject, OnInit} from '@angular/core';
import {SpecialityService} from '../../../services/lectern/speciality.service';
import {CreateEmployeeComponent} from '../create-employee/create-employee.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Speciality} from '../../../model/speciality.model';
import {Group} from '../../../model/group.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Lectern} from '../../../model/lectern.model';
import {GroupService} from '../../../services/deanery/group.service';
import {LecternService} from '../../../services/lectern/lectern.service';

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
  value: string;
  lecternO: Lectern;

  constructor(public specialityService: SpecialityService,
              public dialogRef: MatDialogRef<CreateEmployeeComponent>,
              private groupService: GroupService,
              private lecternService: LecternService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    if (this.data.group === null) {
      this.lecternService.getLecterns(this.data.deaneryId).subscribe(lecterns => {
        this.lecterns = lecterns;
      });
      this.group = new Group();
    } else {
      this.lecternService.getLecternByGroupId(this.data.group.id).subscribe((lectern) => {
        this.lecternO = lectern;
        this.lecterns.push(lectern);
        this.specialityService.getSpecialities(lectern.id).subscribe(specialities => {
          this.specialities = specialities;
        });
      });
      this.group = this.data.group;
    }
    this.formGroup = new FormGroup({
      name: new FormControl(this.group.name, [Validators.required, Validators.maxLength(1000)]),
      description: new FormControl(this.group.description, [Validators.maxLength(10000)]),
      count: new FormControl(this.group.countOfStudents, [Validators.required, Validators.max(99), Validators.pattern('[0-9]{1,2}')]),
      specialitiesF: new FormControl('', [Validators.required]),
      lecternsF: new FormControl('', [Validators.required])});
  }

  public valuesf(num, event): void {
    if (num === 1) {
      this.value = event.currentTarget.value;
      this.groupService.checkUniqueGroupName(this.value).subscribe(flag => {
        if (!flag) {
          this.formGroup.controls.name.setValue('');
          window.alert('Группа с таким названием уже существует');
        }
      });
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
      this.setValuesFromForm();
      this.dialogRef.close( this.group);
  }

  setValuesFromForm() {
    this.group.name = this.formGroup.controls.name.value;
    this.group.description = this.formGroup.controls.description.value;
    this.group.countOfStudents = parseInt(this.formGroup.controls.count.value, 10);
  }

  onCancelClick() {
    this.dialogRef.close(null);
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
