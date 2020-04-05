import {Component, OnInit, ViewChild} from '@angular/core';
import {DeaneryService} from '../../services/deanery.service';
import {Lectern} from '../../model/lectern.model';
import {User} from '../../model/user.model';
import {ActivatedRoute} from '@angular/router';
import {Deanery} from '../../model/deanery.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {HeaderType} from '../../model/header-type';

import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatPaginator, MatTable} from '@angular/material';
import {FormForCreationComponent} from '../form-for-creation/form-for-creation.component';
import {CreateLecternComponent} from '../dialogs/create-lectern/create-lectern.component';
import {Overlay} from '@angular/cdk/overlay';
import {TeacherViewComponent} from '../dialogs/teacher-view/teacher-view.component';
import {StudyPlan} from '../../model/study-plan.model';
import {DeleteLecternComponent} from '../dialogs/delete-lectern/delete-lectern.component';
import {Employee} from '../../model/employee.model';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-deanery',
  templateUrl: './deanery.component.html',
  styleUrls: ['./deanery.component.css']
})
export class DeaneryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  deaneryId: string;
  lecterns: Lectern[] = [];
  deanery: Deanery;
  displayedColumns: string[] = ['name', 'fullname', 'description', 'go', 'staff', 'update', 'delete', 'flows'];
  dataSource: any;
  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    this.localStorageService.observableHeaderType.next(HeaderType.DEANERY);
    if (this.localStorageService.observableDeanery.getValue() === null ||
      this.localStorageService.observableDeanery.getValue().id !== this.deaneryId) {
      this.deaneryService.getDeaneryById(this.deaneryId).subscribe(value => {
        this.deanery = value;
        this.localStorageService.observableDeanery.next(this.deanery);
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить деканат');
      });
    }
    if (this.deaneryId != null) {
        this.deaneryService.getLecterns(this.deaneryId).subscribe(lecterns => {
          this.lecterns = lecterns;
          this.dataSource = new MatTableDataSource<Lectern>(lecterns);
          this.dataSource.paginator = this.paginator;
        }, error2 => {
          this.notifierService.notify('error', 'Не удалось загрузить кафедры');
        });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public  addLectern() {
    const dialogRef = this.dialog.open(CreateLecternComponent, {
      width: '30%',
      height: '50%',
      data: {lectern: null, deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
            this.lecterns.push(result);
            this.dataSource.data = this.lecterns;
            this.dataSource.paginator = this.paginator;
            this.table.renderRows();
            this.notifierService.notify('success', 'Кафедра успешно создана');
      }
    });
  }

  public viewStaff(id) {
    const dialogRef = this.dialog.open(TeacherViewComponent, {
      width: '70%',
      height: '80%',
      data: {lectern: id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
  }

  public deleteLectern(lecternO) {
    const dialogRef = this.dialog.open(DeleteLecternComponent, {
      width: '30%',
      height: '30%',
      data: {lectern: lecternO.id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.lecterns.splice(this.lecterns.indexOf(lecternO, 1));
        this.dataSource.data = this.lecterns;
        this.table.renderRows();
        this.notifierService.notify('success', 'Кафедра успешно удалена');
      }
    });
  }

  public updateLectern(lecternO) {
    const dialogRef = this.dialog.open(CreateLecternComponent, {
      width: '30%',
      height: '50%',
      data: {lectern: JSON.parse(JSON.stringify(lecternO)), deaneryId: null},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
          this.lecterns[this.lecterns.indexOf(lecternO)] = result;
          this.dataSource.data = this.lecterns;
          this.table.renderRows();
          this.notifierService.notify('success', 'Кафедра успешно изменена');
      }
    });
  }
}
