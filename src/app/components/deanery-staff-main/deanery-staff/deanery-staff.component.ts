import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeaneryService} from '../../../services/deanery.service';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog, MatPaginator, MatTable} from '@angular/material';
import {StudyPlan} from '../../../model/study-plan.model';
import {Employee} from '../../../model/employee.model';
import {MatTableDataSource} from '@angular/material/table';
import {CreateEmployeeComponent} from '../../dialogs/create-employee/create-employee.component';
import {NotifierService} from 'angular-notifier';
import {DeleteComponent} from '../../dialogs/delete/delete.component';
import {LocalStorageService} from '../../../services/local-storage.service';

@Component({
  selector: 'app-deanery-staff',
  templateUrl: './deanery-staff.component.html',
  styleUrls: ['./deanery-staff.component.css']
})
export class DeaneryStaffComponent implements OnInit {

  constructor(private deaneryService: DeaneryService,
              private dialog: MatDialog, private overlay: Overlay,
              private localStorageService: LocalStorageService,
              private notifierService: NotifierService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  deaneryId: string;
  @Input() employees: Employee[];
  displayedColumns: string[] = ['name', 'surname', 'patronymic', 'rank', 'update', 'delete'];
  dataSource: any;

  ngOnInit() {
    this.deaneryId = this.localStorageService.observableDeanery.getValue().id;
    this.dataSource = new MatTableDataSource<Employee>(this.employees);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '25%',
      height: '55%',
      data: {employee: null, deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.deaneryService.addEmployee(result, this.deaneryId).subscribe( employee => {
          this.employees.push(employee);
          this.dataSource.data = this.employees;
          this.table.renderRows();
          this.notifierService.notify('success', 'Сотрудник успешно создан');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  deleteEmployee(employeeO) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '25%',
      height: '25%',
      data: {},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.deaneryService.deleteEmployee(employeeO.id).subscribe(employee => {
            this.employees.splice(this.employees.indexOf(employeeO), 1);
            this.dataSource.data = this.employees;
            this.table.renderRows();
            this.notifierService.notify('success', 'Сотрудник успешно удален');
          });
        }
      }
    });
  }

  updateEmployee(employeeO) {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '25%',
      height: '55%',
      data: {employee: JSON.parse(JSON.stringify(employeeO)), deaneryId: null},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.deaneryService.editEmployee(result).subscribe( employee => {
          this.employees[this.employees.indexOf(employeeO)] = employee;
          this.dataSource.data = this.employees;
          this.table.renderRows();
          this.notifierService.notify('success', 'Сотрудник успешно изменен');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }
}