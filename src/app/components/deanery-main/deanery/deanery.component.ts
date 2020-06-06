import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeaneryService} from '../../../services/deanery/deanery.service';
import {Lectern} from '../../../model/lectern.model';
import {Deanery} from '../../../model/deanery.model';
import {LocalStorageService} from '../../../services/local-storage.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatPaginator, MatSort, MatTable} from '@angular/material';
import {CreateLecternComponent} from '../../dialogs/create-lectern/create-lectern.component';
import {Overlay} from '@angular/cdk/overlay';
import {TeacherViewComponent} from '../../dialogs/teacher-view/teacher-view.component';
import {StudyPlan} from '../../../model/study-plan.model';
import {NotifierService} from 'angular-notifier';
import {DeleteComponent} from '../../dialogs/delete/delete.component';
import {LecternService} from '../../../services/lectern/lectern.service';
import {Role} from '../../../model/role.model';

@Component({
  selector: 'app-deanery',
  templateUrl: './deanery.component.html',
  styleUrls: ['./deanery.component.css']
})
export class DeaneryComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  deaneryId: string;
  @Input() lecterns: Lectern[];
  deanery: Deanery;
  currentRoles: Role[] = [];
  displayedColumns: string[] = ['name', 'fullname', 'description', 'go', 'staff', 'pretimetble', 'update', 'delete'];
  dataSource: any;
  constructor(private deaneryService: DeaneryService,
              private lecternService: LecternService,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.localStorageService.observableDeanery.getValue().id;
    this.dataSource = new MatTableDataSource(this.lecterns);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public  addLectern() {
    const dialogRef = this.dialog.open(CreateLecternComponent, {
      width: '40%',
      height: '55%',
      data: {lectern: null},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.lecternService.addLectern(result, this.deaneryId).subscribe(lectern => {
          this.lecterns.push(lectern);
          this.dataSource.data = this.lecterns;
          this.dataSource.paginator = this.paginator;
          this.table.renderRows();
          this.notifierService.notify('success', 'Кафедра успешно создана');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  public viewStaff(id) {
    const dialogRef = this.dialog.open(TeacherViewComponent, {
      width: '80%',
      height: '80%',
      data: {lectern: id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
  }

  public deleteLectern(lecternO) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '25%',
      height: '25%',
      data: {},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.lecternService.deleteLectern(lecternO.id).subscribe(lectern => {
            this.lecterns.splice(this.lecterns.indexOf(lecternO), 1);
            this.dataSource.data = this.lecterns;
            this.table.renderRows();
            this.notifierService.notify('success', 'Кафедра успешно удалена');
          });
        }
      }
    });
  }

  public updateLectern(lecternO) {
    const dialogRef = this.dialog.open(CreateLecternComponent, {
      width: '40%',
      height: '55%',
      data: {lectern: JSON.parse(JSON.stringify(lecternO))},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.lecternService.editLectern(result).subscribe(lectern => {
          this.lecterns[this.lecterns.indexOf(lecternO)] = lectern;
          this.dataSource.data = this.lecterns;
          this.table.renderRows();
          this.notifierService.notify('success', 'Кафедра успешно изменена');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  isDeleteEditAddLecternEnabled() {
    const userRoles = this.localStorageService.getCurrentUser().userRoles.map(userRole => userRole.role);
    return userRoles.includes(Role.ROLE_DEANERY_DEPUTY_HEAD) || userRoles.includes(Role.ROLE_ADMIN) || userRoles.includes(Role.ROLE_DEANERY_METHODIST) || userRoles.includes(Role.ROLE_DEANERY);
  }
}
