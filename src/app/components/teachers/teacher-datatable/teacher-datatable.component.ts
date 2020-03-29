import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {Subscription} from 'rxjs';
import {OperationResponse} from '../../../model/operation-response.model';
import {Teacher} from '../../../model/teacher.model';
import {TeacherAddEditComponent} from '../../dialogs/teachers/teacher-add-edit/teacher-add-edit.component';
import {Subject} from '../../../model/subject.model';
import {TeacherDeleteComponent} from '../../dialogs/teachers/teacher-delete/teacher-delete.component';

@Component({
  selector: 'app-teacher-datatable',
  templateUrl: './teacher-datatable.component.html',
  styleUrls: ['./teacher-datatable.component.css']
})
export class TeacherDatatableComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('teacherTable', {static: false}) teacherTable: MatTable<Subject>;

  @Input() teachers: Teacher[];
  displayedColumns: string[] = ['name', 'surname', 'patronymic', 'position', 'rank', 'academicDegree', 'icons'];
  dataSource: MatTableDataSource<Teacher>;
  editTeacherDialogSubscription: Subscription;
  deleteTeacherDialogSubscription: Subscription;
  addTeacherDialogSubscription: Subscription;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.teachers);
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

  private editTeacher(teacher: Teacher) {
    const dialogRef = this.dialog.open(TeacherAddEditComponent, {
      width: '35%',
      height: '63%',
      data: {title: 'Редактировать преподавателя', teacher},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    this.editTeacherDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse.isOperationCompleted && operationResponse.errorMessage === null) {
        this.notifierService.notify('success', 'Преподаватель был добавлен успешно');
      } else if (operationResponse.isOperationCompleted && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  private deleteTeacher(teacher: Teacher) {
    const dialogRef = this.dialog.open(TeacherDeleteComponent, {
      width: '20%',
      height: '25%',
      data: {teacherId: teacher.id},
      disableClose: true,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    this.deleteTeacherDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse && operationResponse.errorMessage === null && operationResponse.isOperationCompleted) {
        const index = this.teachers.indexOf(teacher, 0);
        if (index > -1) {
          this.teachers.splice(index, 1);
        }
        this.refreshDataTableContent();
        this.notifierService.notify('success', 'Преподаватель был удален');
      } else if (operationResponse && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  private addNewTeacher() {
    const dialogRef = this.dialog.open(TeacherAddEditComponent, {
      width: '35%',
      height: '63%',
      data: {title: 'Добавить преподавателя'},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });

    this.addTeacherDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse.isOperationCompleted && operationResponse.errorMessage === null) {
        this.teachers.unshift(operationResponse.operationResult);
        this.refreshDataTableContent();
        this.notifierService.notify('success', 'Новая специальность была успешно создана.');
      } else if (operationResponse.isOperationCompleted && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  public refreshDataTableContent() {
    this.dataSource.data = this.teachers;
  }

  ngOnDestroy(): void {
    if (this.editTeacherDialogSubscription) {
      this.editTeacherDialogSubscription.unsubscribe();
    }

    if (this.deleteTeacherDialogSubscription) {
      this.deleteTeacherDialogSubscription.unsubscribe();
    }
  }

}
