import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Speciality} from '../../../../model/speciality.model';
import {SpecialityService} from '../../../../services/lectern/speciality.service';
import {LocalStorageService} from '../../../../services/local-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-speciality-add-edit',
  templateUrl: './speciality-add-edit.component.html',
  styleUrls: ['./speciality-add-edit.component.css']
})
export class SpecialityAddEditComponent implements OnInit, OnDestroy {

  constructor(private specialistService: SpecialityService,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<SpecialityAddEditComponent>,
              private localStorageService: LocalStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  title: string;
  speciality: Speciality;
  specialityForm: FormGroup;
  loading = false;
  specialityServiceSubscription: Subscription;
  editMode: boolean;

  ngOnInit() {
    this.title = this.data.title;
    this.speciality = this.data.speciality;

    if (this.speciality != null) {
      this.editMode = true;
      this.initializeForm(this.speciality);
    } else {
      this.editMode = false;
      this.initializeForm(new Speciality());
    }
  }

  private initializeForm(speciality: Speciality) {
    this.specialityForm = this.fb.group({
      name: [speciality.name, [Validators.required, Validators.maxLength(65)]],
      description: [speciality.description, [Validators.maxLength(255)]],
      abbreviation: [speciality.abbreviation, [Validators.required, Validators.maxLength(10)]],
    });
  }

  get name(): FormControl {
    return this.specialityForm.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.specialityForm.get('description') as FormControl;
  }

  get abbreviation(): FormControl {
    return this.specialityForm.get('abbreviation') as FormControl;
  }

  onCancelClick() {
    this.dialogRef.close({isOperationCompleted: false, operationResult: null, errorMessage: null});
  }

  onConfirmClick() {
    this.editMode ? this.editSpeciality() : this.createNewSpeciality();
  }

  private createNewSpeciality() {
    const speciality = new Speciality();
    this.setValuesFromForm(speciality);
    this.loading = true;
    if (this.localStorageService.observableLectern.getValue() === null) {
      this.loading = false;
      this.dialogRef.close({
        isOperationCompleted: true,
        operationResult: null,
        errorMessage: 'Создание специальности не выполнено.'
      });
    }
    this.specialityServiceSubscription = this.specialistService.createSpeciality
    (speciality, this.localStorageService.observableLectern.getValue().id).subscribe(result => {
        this.loading = false;
        this.dialogRef.close({isOperationCompleted: true, operationResult: result, errorMessage: null});
      }, error => {
        this.loading = false;
        this.dialogRef.close({
          isOperationCompleted: true,
          operationResult: null,
          errorMessage: 'Создание специальности не выполнено.'
        });
      }
    );
  }

  private editSpeciality() {
    const specialityToSave = this.createSpecialityCopy(this.speciality);
    this.setValuesFromForm(specialityToSave);
    this.loading = true;
    this.specialityServiceSubscription = this.specialistService.editSpeciality(specialityToSave).subscribe(result => {
        this.loading = false;
        this.setValuesFromForm(this.speciality);
        this.dialogRef.close({isOperationCompleted: true, operationResult: result, errorMessage: null});
      }, error => {
        this.loading = false;
        this.dialogRef.close({
          isOperationCompleted: true,
          operationResult: null,
          errorMessage: 'Изменение специальности не выполнено. Ошибка на сервере.'
        });
      }
    );
  }

  private setValuesFromForm(speciality: Speciality) {
    speciality.name = this.specialityForm.controls.name.value;
    speciality.description = this.specialityForm.controls.description.value;
    speciality.abbreviation = this.specialityForm.controls.abbreviation.value;
  }

  private createSpecialityCopy(speciality: Speciality): Speciality {
    const specialityCopy = new Speciality();
    specialityCopy.id = speciality.id;
    return specialityCopy;
  }

  ngOnDestroy(): void {
    if (this.specialityServiceSubscription) {
      this.specialityServiceSubscription.unsubscribe();
    }
  }

}
