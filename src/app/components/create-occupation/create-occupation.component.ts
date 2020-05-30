import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Occupation} from '../../model/occupation.model';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-create-occupation',
  templateUrl: './create-occupation.component.html',
  styleUrls: ['./create-occupation.component.css']
})
export class CreateOccupationComponent implements OnInit {
  formGroup: any;
  occupation: Occupation = new Occupation();
  valueS: string;

  constructor(private scheduleService: ScheduleService, public dialogRef: MatDialogRef<CreateOccupationComponent>) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      symbol: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      value: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    });
  }
  get symbol(): FormControl {
    return this.formGroup.get('symbol') as FormControl;
  }

  get value(): FormControl {
    return this.formGroup.get('value') as FormControl;
  }

  saveValue(num, event): void {
    if (num === 1) {
      this.valueS = event.currentTarget.value;
      this.scheduleService.checkUniqueOccupation('symbol', this.valueS).subscribe(flag => {
        if (flag) {
          this.formGroup.controls.symbol.setValue('');
          window.alert('Данный символ уже используется');
        }
      });
    } else {
      this.valueS = event.currentTarget.value;
      this.scheduleService.checkUniqueOccupation('value', this.valueS).subscribe(flag => {
        if (flag) {
          this.formGroup.controls.symbol.setValue('');
          window.alert('Данное название нагрузки уже используется');
        }
      });
    }
  }

  setValuesFromForm() {
    this.occupation.symbol = this.formGroup.controls.symbol.value;
    this.occupation.value = this.formGroup.controls.value.value;
  }

  add(): void {
    if (this.formGroup.valid) {
      this.scheduleService.addOccupation(this.occupation).subscribe(occupation => {
        this.dialogRef.close(occupation);
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }
}
