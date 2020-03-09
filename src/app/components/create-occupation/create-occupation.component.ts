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
      symbol: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
  }

  saveValue(num, event): void {
    if (num === 1) {
	  this.valueS = event.currentTarget.value;
	  this.scheduleService.getOccupationBySymbol(event.currentTarget.value).subscribe(occupation => {
		  if (occupation) {
			  this.formGroup.controls.symbol.setValue('');
			  window.alert('Данный символ уже используется');
		  } else {
			  this.occupation.symbol = this.valueS;
		  }
	  });

    } else {
      this.occupation.value = event.currentTarget.value;
    }
  }

  add(): void {
    if (this.formGroup.valid) {
	  this.scheduleService.addOccupation(this.occupation).subscribe(occu => {
	  this.scheduleService.getOccupationBySymbol(this.occupation.symbol).subscribe(occ => {this.dialogRef.close(occ); });
	  })
    } else {
      window.alert('Заполните обязательные поля');
    }
  }
}
