import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Group} from '../../../model/group.model';
import {PrinterUtilityService} from '../../../services/util/printer-utility.service';

@Component({
  selector: 'app-groups-datatable',
  templateUrl: './groups-datatable.component.html',
  styleUrls: ['./groups-datatable.component.css']
})
export class GroupsDatatableComponent implements OnInit {

  constructor(private printerUtilityService: PrinterUtilityService) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('groupMatTable', {static: false}) groupMatTable: MatTable<Group>;

  @Input() groups: Group[];
  displayedColumns: string[] = ['name', 'description', 'countOfStudents'];
  dataSource: MatTableDataSource<Group>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.groups);
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



  // private editTeacher(teacher: Teacher) {
  //   const dialogRef = this.dialog.open(TeacherAddEditComponent, {
  //     data: {title: 'Редактировать преподавателя', teacher}
  //   });
  //
  //   this.editTeacherDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
  //     if (operationResponse.isOperationCompleted && operationResponse.errorMessage === null) {
  //       this.notifierService.notify('success', 'Преподаватель был добавлен успешно');
  //     } else if (operationResponse.isOperationCompleted && operationResponse.errorMessage !== null) {
  //       this.notifierService.notify('error', operationResponse.errorMessage);
  //     }
  //   });
  // }

  public refreshDataTableContent() {
    this.dataSource.data = this.groups;
  }
}
