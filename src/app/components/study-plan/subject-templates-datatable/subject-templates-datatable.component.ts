import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {LocalStorageService} from '../../../services/local-storage.service';
import {PrinterUtilityService} from '../../../services/util/printer-utility.service';
import {Subject} from '../../../model/subject.model';

@Component({
  selector: 'app-subject-templates-datatable',
  templateUrl: './subject-templates-datatable.component.html',
  styleUrls: ['./subject-templates-datatable.component.css']
})
export class SubjectTemplatesDatatableComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private localStorageService: LocalStorageService,
              private printerUtilityService: PrinterUtilityService) {

  }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('subjectTemplateTable', {static: false}) subjectTemplateTable: MatTable<Subject>;

  @Output() subjectAddEvent = new EventEmitter<Subject>();
  @Input() subjectTemplates: Subject[];
  displayedColumns: string[] = ['prototypes', 'add-icon'];
  dataSource: MatTableDataSource<Subject>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.subjectTemplates);
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

  addSubjectToStudyPlan(subjectTemplate: Subject) {
    this.subjectAddEvent.emit(subjectTemplate);
  }
}
