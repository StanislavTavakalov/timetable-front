import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {Subscription} from 'rxjs';
import {OperationResponse} from '../../../model/operation-response.model';
import {Teacher} from '../../../model/teacher.model';
import {TeacherAddEditComponent} from '../../dialogs/teachers/teacher-add-edit/teacher-add-edit.component';
import {TeacherDeleteComponent} from '../../dialogs/teachers/teacher-delete/teacher-delete.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PrinterUtilityService} from '../../../services/util/printer-utility.service';

@Component({
  selector: 'app-teacher-datatable',
  templateUrl: './teacher-datatable.component.html',
  styleUrls: ['./teacher-datatable.component.css']
})
export class TeacherDatatableComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private router: Router,
              private route: ActivatedRoute,
              private notifierService: NotifierService,
              private printerUtilityService: PrinterUtilityService) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('teacherTable', {static: false}) teacherTable: MatTable<Teacher>;

  @Input() teachers: Teacher[];
  displayedColumns: string[] = ['name', 'surname', 'patronymic', 'position', 'academicRank',
    'academicDegree', 'staffType', 'icons'];
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
      data: {title: 'Редактировать преподавателя', teacher}
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
      data: {teacherId: teacher.id},
      disableClose: true
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
      data: {title: 'Добавить преподавателя'}
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

  private linkTeachers() {
    const lecternId = this.route.snapshot.paramMap.get('id');
    window.location.href = 'http://localhost:8080/lectern/' + lecternId + '/addusertoteacher';
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
