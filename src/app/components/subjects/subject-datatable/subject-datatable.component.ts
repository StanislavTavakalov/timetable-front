import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {Subject} from '../../../model/subject.model';
import {Subscription} from 'rxjs';
import {OperationResponse} from '../../../model/operation-response.model';
import {SubjectDeleteComponent} from '../../dialogs/subjects/subject-delete/subject-delete.component';
import {SeveritySubject} from '../../../model/severity-subject.model';
import {PereodicSeveritySubject} from '../../../model/pereodic-severity-subject.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subject-datatable',
  templateUrl: './subject-datatable.component.html',
  styleUrls: ['./subject-datatable.component.css']
})
export class SubjectDatatableComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private route: ActivatedRoute,
              private router: Router) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('subjectTable', {static: false}) subjectMatTable: MatTable<Subject>;

  @Input() subjects: Subject[];
  displayedColumns: string[] = ['abbreviation', 'name', 'description', 'sumOfHours', 'severities', 'pereodicSeverities', 'icons'];
  dataSource: MatTableDataSource<Subject>;
  deleteSubjectDialogSubscription: Subscription;
  lecternId: string;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.subjects);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.lecternId = this.route.snapshot.paramMap.get('id');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSubject(subject: Subject) {
    const dialogRef = this.dialog.open(SubjectDeleteComponent, {
      data: {subjectId: subject.id},
      disableClose: true
    });

    this.deleteSubjectDialogSubscription = dialogRef.afterClosed().subscribe((operationResponse: OperationResponse) => {
      if (operationResponse && operationResponse.errorMessage === null && operationResponse.isOperationCompleted) {
        const index = this.subjects.indexOf(subject, 0);
        if (index > -1) {
          this.subjects.splice(index, 1);
        }
        this.refreshDataTableContent();
        this.notifierService.notify('success', 'Предмет был удален');
      } else if (operationResponse && operationResponse.errorMessage !== null) {
        this.notifierService.notify('error', operationResponse.errorMessage);
      }
    });
  }

  createSubject() {
    this.router.navigate(['lectern/' + this.lecternId + '/subjects/subject-edit']);
  }

  private getSeveritiesAsString(severities: SeveritySubject[]): string {
    const sev = severities.map(severity => severity.severity.name + ': ' + severity.hours);
    let result = '';
    for (const str of sev) {
      result += str + '; ';
    }
    return result;
  }

  // Output with semester number
  // private getPereodicSeveritiesAsString(severities: PereodicSeveritySubject[]): string {
  //   const sev = severities.map(severity => severity.pereodicSeverity.name + ': ' +
  //     severity.semesterNumbers.map(semNum => semNum.number + ''));
  //   let result = '';
  //   for (const str of sev) {
  //     result += str + '; ';
  //   }
  //   return result;
  // }

  private getPereodicSeveritiesAsString(severities: PereodicSeveritySubject[]): string {
    const sev = severities.map(severity => severity.pereodicSeverity.name + '; ');
    let result = '';
    for (const str of sev) {
      result += str;
    }
    return result;
  }

  public refreshDataTableContent() {
    this.dataSource.data = this.subjects;
  }

  ngOnDestroy(): void {
    if (this.deleteSubjectDialogSubscription) {
      this.deleteSubjectDialogSubscription.unsubscribe();
    }
  }

}
