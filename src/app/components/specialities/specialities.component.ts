import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {LocalStorageService} from '../../services/local-storage.service';
import {ActivatedRoute} from '@angular/router';
import {SpecialityService} from '../../services/lectern/speciality.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {HeaderType} from '../../model/header-type';
import {Lectern} from '../../model/lectern.model';
import {Speciality} from '../../model/speciality.model';
import {Subscription} from 'rxjs';
import {NotifierService} from 'angular-notifier';

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
              private route: ActivatedRoute) {

  }

  lectern: Lectern;
  specialities: Speciality[];
  specialityServiceSubscription: Subscription;
  lecternServiceSubscription: Subscription;
  specialityTableVisible = false;
  loading = false;
  ngOnInit() {

    this.loading = true;
    // setting lectern id when we get to this Lectern section
    const lecternId = this.route.snapshot.paramMap.get('id');

    this.localStorageService.observableHeaderType.next(HeaderType.LECTERN);
    // loading of Lectern if it is null or id changed
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== lecternId) {
      this.lecternServiceSubscription = this.lecternService.getLecternById(lecternId).subscribe(value => {
        this.lectern = value;
        this.localStorageService.observableLectern.next(this.lectern);
        console.log(this.lectern);
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить кафедру.');
      });
    }

    this.specialityServiceSubscription = this.specialityService.getSpecialities(lecternId).subscribe(specialities => {
      this.loading = false;
      this.specialities = specialities;
      this.specialityTableVisible = true;
    }, error => {
      this.loading = false;
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

