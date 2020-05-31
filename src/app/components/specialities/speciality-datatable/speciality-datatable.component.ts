import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Speciality} from '../../../model/speciality.model';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {SpecialityAddEditComponent} from '../../dialogs/speciality/speciality-add-edit/speciality-add-edit.component';
import {Overlay} from '@angular/cdk/overlay';
import {Subscription} from 'rxjs';
import {OperationResponse} from '../../../model/operation-response.model';
import {SpecialityDeleteComponent} from '../../dialogs/speciality/speciality-delete/speciality-delete.component';
import {NotifierService} from 'angular-notifier';
import {PrinterUtilityService} from '../../../services/util/printer-utility.service';


@Component({
  selector: 'app-speciality-datatable',
  templateUrl: './speciality-datatable.component.html',
  styleUrls: ['./speciality-datatable.component.css']
})
export class SpecialityDatatableComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private printerUtilityService: PrinterUtilityService) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('specialityTable', {static: false}) specialityTable: MatTable<Speciality>;

  @Input() specialities: Speciality[];
  displayedColumns: string[] = ['abbreviation', 'name', 'description', 'icons'];
  dataSource: MatTableDataSource<Speciality>;
  editSpecialityDialogSubscription: Subscription;
  deleteSpecialityDialogSubscription: Subscription;
  addSpecialityDialogSubscription: Subscription;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.specialities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editSpeciality(speciality: Speciality) {
    const dialogRef = this.dialog.open(SpecialityAddEditComponent, {
      data: {title: 'Редактировать специальность', speciality}
    });

    this.editSpecialityDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse.isOperationCompleted && operationResponse.errorMessage === null) {
        this.notifierService.notify('success', 'Специальность была успешно изменена');
      } else if (operationResponse.isOperationCompleted && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  deleteSpeciality(speciality: Speciality) {
    const dialogRef = this.dialog.open(SpecialityDeleteComponent, {
      data: {specialityId: speciality.id},
      disableClose: true
    });

    this.deleteSpecialityDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse && operationResponse.errorMessage === null && operationResponse.isOperationCompleted) {
        const index = this.specialities.indexOf(speciality, 0);
        if (index > -1) {
          this.specialities.splice(index, 1);
        }
        this.refreshDataTableContent();
        this.notifierService.notify('success', 'Специальность была удалена');
      } else if (operationResponse && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  private addNewSpeciality() {
    const dialogRef = this.dialog.open(SpecialityAddEditComponent, {
      data: {title: 'Новая специальность'}
    });

    this.addSpecialityDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse.isOperationCompleted && operationResponse.errorMessage === null) {
        this.specialities.unshift(operationResponse.operationResult);
        this.refreshDataTableContent();
        this.notifierService.notify('success', 'Новая специальность была успешно создана.');
      } else if (operationResponse.isOperationCompleted && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  public refreshDataTableContent() {
    this.dataSource.data = this.specialities;
  }

  ngOnDestroy(): void {
    if (this.addSpecialityDialogSubscription) {
      this.addSpecialityDialogSubscription.unsubscribe();
    }

    if (this.editSpecialityDialogSubscription) {
      this.editSpecialityDialogSubscription.unsubscribe();
    }

    if (this.deleteSpecialityDialogSubscription) {
      this.deleteSpecialityDialogSubscription.unsubscribe();
    }
  }
}
