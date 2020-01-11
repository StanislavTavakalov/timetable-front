import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Occupation} from '../../model/occupation.model';

@Component({
  selector: 'app-create-occupation',
  templateUrl: './create-occupation.component.html',
  styleUrls: ['./create-occupation.component.css']
})
export class CreateOccupationComponent implements OnInit {
  formGroup: any;
  occupation: Occupation = new Occupation();

  constructor(public dialogRef: MatDialogRef<CreateOccupationComponent>) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      symbol: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
  }

  saveValue(num, event): void {
    if (num === 1) {
      this.occupation.symbol = event.currentTarget.value;
    } else {
      this.occupation.value = event.currentTarget.value;
    }
  }

  add(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.occupation);
    } else {
      window.alert('Заполните обязательные поля');
    }
  }



}
