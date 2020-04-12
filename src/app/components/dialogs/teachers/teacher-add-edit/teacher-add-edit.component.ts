import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LocalStorageService} from '../../../../services/local-storage.service';
import {Subscription} from 'rxjs';
import {TeacherService} from '../../../../services/lectern/teacher.service';
import {Teacher} from '../../../../model/teacher.model';

@Component({
  selector: 'app-teacher-add-edit',
  templateUrl: './teacher-add-edit.component.html',
  styleUrls: ['./teacher-add-edit.component.css']
})
export class TeacherAddEditComponent implements OnInit, OnDestroy {

  constructor(private teacherService: TeacherService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<TeacherAddEditComponent>,
              private localStorageService: LocalStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  title: string;
  teacher: Teacher;
  teacherForm: FormGroup;
  loading = false;
  teacherServiceSubscription: Subscription;
  editMode: boolean;

  ngOnInit() {
    this.title = this.data.title;
    this.teacher = this.data.teacher;

    if (this.teacher != null) {
      this.editMode = true;
      this.initializeForm(this.teacher);
    } else {
      this.editMode = false;
      this.initializeForm(new Teacher());
    }
  }

  private initializeForm(teacher: Teacher) {
    this.teacherForm = this.fb.group({
      name: [teacher.name, [Validators.required, Validators.maxLength(25)]],
      surname: [teacher.surname, [Validators.required, Validators.maxLength(25)]],
      patronymic: [teacher.patronymic, [Validators.required, Validators.maxLength(25)]],
      position: [teacher.position, [Validators.required, Validators.maxLength(25)]],
      rank: [teacher.rank, [Validators.required, Validators.maxLength(25)]],
      academicDegree: [teacher.academicDegree, [Validators.required, Validators.maxLength(1000)]]
    });
  }

  get name(): FormControl {
    return this.teacherForm.get('name') as FormControl;
  }

  get surname(): FormControl {
    return this.teacherForm.get('surname') as FormControl;
  }

  get patronymic(): FormControl {
    return this.teacherForm.get('patronymic') as FormControl;
  }

  get position(): FormControl {
    return this.teacherForm.get('position') as FormControl;
  }

  get rank(): FormControl {
    return this.teacherForm.get('rank') as FormControl;
  }

  get academicDegree(): FormControl {
    return this.teacherForm.get('academicDegree') as FormControl;
  }

  onCancelClick() {
    this.dialogRef.close({isOperationCompleted: false, operationResult: null, errorMessage: null});
  }

  onConfirmClick() {
    this.editMode ? this.editTeacher() : this.createNewTeacher();
  }

  private createNewTeacher() {
    const teacher = new Teacher();
    this.setValuesFromForm(teacher);
    this.loading = true;
    if (this.localStorageService.observableLectern.getValue() === null) {
      this.loading = false;
      this.dialogRef.close({
        isOperationCompleted: true,
        operationResult: null,
        errorMessage: 'Добавление преподавателя не выполнено.'
      });
    }
    this.teacherServiceSubscription = this.teacherService.createTeacher
    (teacher, this.localStorageService.observableLectern.getValue().id).subscribe(result => {
        this.loading = false;
        this.dialogRef.close({isOperationCompleted: true, operationResult: result, errorMessage: null});
      }, error => {
        this.loading = false;
        this.dialogRef.close({
          isOperationCompleted: true,
          operationResult: null,
          errorMessage: 'Добавление преподавателя не выполнено.'
        });
      }
    );
  }

  private editTeacher() {
    const teacherToSave = this.createTeacherCopy(this.teacher);
    this.setValuesFromForm(teacherToSave);
    this.loading = true;
    this.teacherServiceSubscription = this.teacherService.editTeacher(teacherToSave).subscribe(result => {
        this.loading = false;
        this.setValuesFromForm(this.teacher);
        this.dialogRef.close({isOperationCompleted: true, operationResult: result, errorMessage: null});
      }, error => {
        this.loading = false;
        this.dialogRef.close({
          isOperationCompleted: true,
          operationResult: null,
          errorMessage: 'Изменение преподавателя не выполнено. Ошибка на сервере.'
        });
      }
    );
  }

  private setValuesFromForm(teacher: Teacher) {
    teacher.name = this.teacherForm.controls.name.value;
    teacher.surname = this.teacherForm.controls.surname.value;
    teacher.patronymic = this.teacherForm.controls.patronymic.value;
    teacher.position = this.teacherForm.controls.position.value;
    teacher.rank = this.teacherForm.controls.rank.value;
    teacher.academicDegree = this.teacherForm.controls.academicDegree.value;
  }

  private createTeacherCopy(teacher: Teacher): Teacher {
    const teacherCopy = new Teacher();
    teacherCopy.id = teacher.id;
    return teacherCopy;
  }

  ngOnDestroy(): void {
    if (this.teacherServiceSubscription) {
      this.teacherServiceSubscription.unsubscribe();
    }
  }

}
