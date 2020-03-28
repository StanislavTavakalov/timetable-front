import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {LocalStorageService} from '../../services/local-storage.service';
import {ActivatedRoute} from '@angular/router';
import {SpecialityService} from '../../services/lectern/speciality.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {HeaderType} from '../../model/header-type';
import {Lectern} from '../../model/lectern.model';
import {Speciality} from '../../model/speciality.model';
import {SpecialityAddEditComponent} from '../dialogs/speciality/speciality-add-edit/speciality-add-edit.component';
import {Subscription} from 'rxjs';
import {OperationResponse} from '../../model/operation-response.model';
import {NotifierService} from 'angular-notifier';
import {SpecialityDatatableComponent} from './speciality-datatable/speciality-datatable.component';

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

  @ViewChild(SpecialityDatatableComponent, {static: false})
  specialityDatatableComponent: SpecialityDatatableComponent;

  lectern: Lectern;
  specialities: Speciality[];
  addSpecialityDialogSubscription: Subscription;
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

  private addNewSpeciality() {
    const dialogRef = this.dialog.open(SpecialityAddEditComponent, {
      width: '35%',
      height: '40%',
      data: {title: 'Новая специальность'},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    this.addSpecialityDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse.isOperationCompleted && operationResponse.errorMessage === null) {
        this.specialities.unshift(operationResponse.operationResult);
        this.specialityDatatableComponent.refreshDataTableContent();
        this.notifierService.notify('success', 'Новая специальность была успешно создана.');
      } else if (operationResponse.isOperationCompleted && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }


  ngOnDestroy(): void {
    if (this.addSpecialityDialogSubscription) {
      this.addSpecialityDialogSubscription.unsubscribe();
    }

    if (this.specialityServiceSubscription) {
      this.specialityServiceSubscription.unsubscribe();
    }

    if (this.lecternServiceSubscription) {
      this.lecternServiceSubscription.unsubscribe();
    }
  }
}

