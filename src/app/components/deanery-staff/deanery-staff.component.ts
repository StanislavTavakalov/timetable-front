import {Component, OnInit, ViewChild} from '@angular/core';
import {DeaneryService} from '../../services/deanery.service';
import {ActivatedRoute} from '@angular/router';
import {Overlay} from '@angular/cdk/overlay';
import {MatDialog, MatPaginator, MatTable} from '@angular/material';
import {StudyPlan} from '../../model/study-plan.model';
import {Employee} from '../../model/employee.model';
import {MatTableDataSource} from '@angular/material/table';
import {CreateEmployeeComponent} from '../dialogs/create-employee/create-employee.component';
import {DeleteEmployeeComponent} from '../dialogs/delete-employee/delete-employee.component';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-deanery-staff',
  templateUrl: './deanery-staff.component.html',
  styleUrls: ['./deanery-staff.component.css']
})
export class DeaneryStaffComponent implements OnInit {

  constructor(private deaneryService: DeaneryService,
              private route: ActivatedRoute,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  deaneryId: string;
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'surname', 'patronymic', 'rank', 'update', 'delete'];
  dataSource: any;

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    if (this.deaneryId != null) {
      this.deaneryService.getEmployeesByDeneryId(this.deaneryId).subscribe(employees => {
        this.employees = employees;
        this.dataSource = new MatTableDataSource<Employee>(employees);
        this.dataSource.paginator = this.paginator;
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить сотрудников');
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEmployee() {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '30%',
      height: '60%',
      data: {employee: null, deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
            this.employees.push(result);
            this.dataSource.data = this.employees;
            this.table.renderRows();
            this.notifierService.notify('success', 'Сотрудник успешно создан');
      }
    });
  }

  deleteEmployee(employeeO) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '30%',
      height: '30%',
      data: {employee: employeeO.id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.employees.splice(this.employees.indexOf(employeeO), 1);
        this.dataSource.data = this.employees;
        this.table.renderRows();
        this.notifierService.notify('success', 'Сотрудник успешно удален');
      }
    });
  }

  updateEmployee(employeeO) {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      width: '30%',
      height: '60%',
      data: {employee: JSON.parse(JSON.stringify(employeeO)), deaneryId: null},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
          this.employees[this.employees.indexOf(employeeO)] = result;
          this.dataSource.data = this.employees;
          this.table.renderRows();
          this.notifierService.notify('success', 'Сотрудник успешно изменен');
      }
    });
  }
}
