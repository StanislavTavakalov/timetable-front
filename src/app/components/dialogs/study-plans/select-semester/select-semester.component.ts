import {Component, Inject, OnInit} from '@angular/core';
import {SeverityService} from '../../../../services/lectern/severity.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-select-semester',
  templateUrl: './select-semester.component.html',
  styleUrls: ['./select-semester.component.css']
})
export class SelectSemesterComponent implements OnInit {

  constructor(private severityService: SeverityService,
              private dialogRef: MatDialogRef<SelectSemesterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  semListForCheckboxGroup;

  ngOnInit() {
    const excludeSemIds = this.data.excludeSemIds;
    const semInitialIds = this.data.semInitialIds;

    this.semListForCheckboxGroup = semInitialIds.map(semNum => [false, semNum]);

    for (const entry of this.semListForCheckboxGroup) {
      if (excludeSemIds.indexOf(entry[1]) !== -1) {
        entry[0] = true;
      }
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    const semToAdd: number[] = [];
    for (const checkBox of this.semListForCheckboxGroup) {
      if (checkBox[0]) {
        semToAdd.push(checkBox[1]);
      }
    }
    // console.log(semToAdd);
    this.dialogRef.close(semToAdd);
  }

  makeChecked(event, sev) {
    sev[0] = !sev[0];
  }

  disableButton() {
    if (!this.semListForCheckboxGroup) {
      return false;
    }
    for (const checkBox of this.semListForCheckboxGroup) {
      if (checkBox[0]) {
        return false;
      }
    }
    return true;
  }

}
