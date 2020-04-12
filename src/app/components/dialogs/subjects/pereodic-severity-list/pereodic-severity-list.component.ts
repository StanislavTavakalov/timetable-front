import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {SeverityService} from '../../../../services/lectern/severity.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Subscription} from 'rxjs';
import {Severity} from '../../../../model/severity.model';
import {PereodicSeverityService} from '../../../../services/lectern/pereodic-severity.service';
import {PereodicSeverity} from '../../../../model/pereodic-severity.model';

@Component({
  selector: 'app-pereodic-severity-list',
  templateUrl: './pereodic-severity-list.component.html',
  styleUrls: ['./pereodic-severity-list.component.css']
})
export class PereodicSeverityListComponent implements OnInit, OnDestroy {

  constructor(private pereodicSeverityService: PereodicSeverityService,
              private dialogRef: MatDialogRef<PereodicSeverityListComponent>,
              private notifierService: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  excludePereodicSeverityIds: string[];
  pereodicSeverityServiceSubscription: Subscription;
  selectedPereodicSeverity: PereodicSeverity;
  pereodicSeverityList: PereodicSeverity[];
  pereodicSeverityListForCheckboxGroup;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.excludePereodicSeverityIds = this.data.excludePereodicSeverityIds;
    this.pereodicSeverityServiceSubscription = this.pereodicSeverityService.getPereodicSeverities().subscribe(pereodicSeverity => {
      this.pereodicSeverityList = pereodicSeverity;
      if (this.excludePereodicSeverityIds) {
        this.excludePereodicSeverities();
      }
      this.selectedPereodicSeverity = this.pereodicSeverityList[0];
      this.pereodicSeverityListForCheckboxGroup = this.pereodicSeverityList.map(severity => [false, severity]);
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notifierService.notify('error', 'Ошибка при загрузке списка переодических нагрузок');
    });
  }

  ngOnDestroy(): void {
    if (this.pereodicSeverityServiceSubscription) {
      this.pereodicSeverityServiceSubscription.unsubscribe();
    }
  }

  excludePereodicSeverities() {
    const pereodicSeverityListCount = this.pereodicSeverityList.length;
    for (let num = 0; num < pereodicSeverityListCount; num++) {
      if (num < this.pereodicSeverityList.length) {
        if (this.excludePereodicSeverityIds.includes(this.pereodicSeverityList[num].id)) {
          const index = this.pereodicSeverityList.indexOf(this.pereodicSeverityList[num], 0);
          if (index > -1) {
            this.pereodicSeverityList.splice(index, 1);
            num--;
          }
        }
      }
    }
  }

  makeChecked(event, perSev) {
    perSev[0] = !perSev[0];
  }

  disableButton() {
    if (!this.pereodicSeverityListForCheckboxGroup) {
      return false;
    }
    for (const checkBox of this.pereodicSeverityListForCheckboxGroup) {
      if (checkBox[0]) {
        return false;
      }
    }
    return true;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    const severitiesToAdd: PereodicSeverity[] = [];
    for (const checkBox of this.pereodicSeverityListForCheckboxGroup) {
      if (checkBox[0]) {
        severitiesToAdd.push(checkBox[1]);
      }
    }
    this.dialogRef.close(severitiesToAdd);
  }

}
