import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {LocalStorageService} from '../../services/local-storage.service';
import {ActivatedRoute} from '@angular/router';
import {SpecialityService} from '../../services/lectern/speciality.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {Speciality} from '../../model/speciality.model';
import {Subscription} from 'rxjs';
import {NotifierService} from 'angular-notifier';
import {LecternUtilityService} from '../../services/lectern/lectern-utility.service';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private localStorageService: LocalStorageService,
              private specialityService: SpecialityService,
              private lecternService: LecternService,
              private lecternUtilityService: LecternUtilityService,
              private route: ActivatedRoute) {

  }

  specialities: Speciality[];
  specialityServiceSubscription: Subscription;
  lecternServiceSubscription: Subscription;
  specialityTableVisible = false;
  isSpecialitiesLoading = false;

  ngOnInit() {
    this.isSpecialitiesLoading = true;
    const lecternId = this.route.snapshot.paramMap.get('id');
    const token = this.route.snapshot.queryParamMap.get('token');

    this.lecternUtilityService.checkToken(token, lecternId);
    this.lecternUtilityService.loadLecternToLocalStorageIfNeeded(lecternId);

    this.specialityServiceSubscription = this.specialityService.getSpecialities(lecternId).subscribe(specialities => {
      this.isSpecialitiesLoading = false;
      this.specialities = specialities;
      this.specialityTableVisible = true;
    }, error => {
      this.isSpecialitiesLoading = false;
      this.specialityTableVisible = true;
      this.notifierService.notify('error', 'Не удалось загрузить специальности.');
    });
  }

  ngOnDestroy(): void {
    if (this.specialityServiceSubscription) {
      this.specialityServiceSubscription.unsubscribe();
    }

    if (this.lecternServiceSubscription) {
      this.lecternServiceSubscription.unsubscribe();
    }
  }
}

