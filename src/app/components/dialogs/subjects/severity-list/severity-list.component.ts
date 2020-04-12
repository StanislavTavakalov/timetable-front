import {Component, Inject, OnDestroy, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SeverityService} from '../../../../services/lectern/severity.service';
import {NotifierService} from 'angular-notifier';
import {Severity} from '../../../../model/severity.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-severity-list',
  templateUrl: './severity-list.component.html',
  styleUrls: ['./severity-list.component.css']
})
export class SeverityListComponent implements OnInit, OnDestroy {

  constructor(private severityService: SeverityService,
              private dialogRef: MatDialogRef<SeverityListComponent>,
              private notifierService: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  excludeSeverityIds: string[];
  severityServiceSubscription: Subscription;
  selectedSeverity: Severity;
  severityList: Severity[];
  severityListForCheckboxGroup;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.excludeSeverityIds = this.data.excludeSeverityIds;
    this.severityServiceSubscription = this.severityService.getSeverities().subscribe(severities => {
      this.severityList = severities;
      if (this.excludeSeverityIds) {
        this.excludeSeverities();
      }
      this.selectedSeverity = this.severityList[0];
      this.severityListForCheckboxGroup = this.severityList.map(severity => [false, severity]);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notifierService.notify('error', 'Ошибка при загрузке списка нагрузок');
    });
  }

  ngOnDestroy(): void {
    if (this.severityServiceSubscription) {
      this.severityServiceSubscription.unsubscribe();
    }
  }

  excludeSeverities() {
    const severityListCount = this.severityList.length;
    for (let num = 0; num < severityListCount; num++) {
      if (num < this.severityList.length) {
        if (this.excludeSeverityIds.includes(this.severityList[num].id)) {
          const index = this.severityList.indexOf(this.severityList[num], 0);
          if (index > -1) {
            this.severityList.splice(index, 1);
            num--;
          }
        }
      }
    }
  }

  selectSeverity(severity: Severity) {
    this.selectedSeverity = severity;
    console.log(this.severityListForCheckboxGroup);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    const severitiesToAdd: Severity[] = [];
    for (const checkBox of this.severityListForCheckboxGroup) {
      if (checkBox[0]) {
        severitiesToAdd.push(checkBox[1]);
      }
    }
    this.dialogRef.close(severitiesToAdd);
  }

  makeChecked(event, sev) {
    sev[0] = !sev[0];
  }

  disableButton() {
    if (!this.severityListForCheckboxGroup) {
      return false;
    }
    for (const checkBox of this.severityListForCheckboxGroup) {
      if (checkBox[0]) {
        return false;
      }
    }
    return true;
  }


}
