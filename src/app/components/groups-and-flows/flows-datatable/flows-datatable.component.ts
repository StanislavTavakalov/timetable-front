import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Flow} from '../../../model/flow.model';
import {PrinterUtilityService} from '../../../services/util/printer-utility.service';

@Component({
  selector: 'app-flows-datatable',
  templateUrl: './flows-datatable.component.html',
  styleUrls: ['./flows-datatable.component.css']
})
export class FlowsDatatableComponent implements OnInit {

  constructor(private printerUtilityService: PrinterUtilityService) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('flowMatTable', {static: false}) flowMatTable: MatTable<Flow>;

  @Input() flows: Flow[];
  displayedColumns: string[] = ['name', 'description'];
  dataSource: MatTableDataSource<Flow>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.flows);
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
    this.dataSource.data = this.flows;
  }

}
