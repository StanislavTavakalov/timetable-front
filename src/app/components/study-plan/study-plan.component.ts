import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SubjectService} from '../../services/lectern/subject.service';
import {MatDialog, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {StudyPlan} from '../../model/study-plan.model';
import {Subject} from '../../model/subject.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Overlay} from '@angular/cdk/overlay';
import {CreateStudyPlanComponent} from '../dialogs/study-plans/create-study-plan/create-study-plan.component';
import {StudyPlanDetailsComponent} from '../dialogs/study-plans/study-plan-details/study-plan-details.component';
import {SeverityService} from '../../services/lectern/severity.service';
import {Severity} from '../../model/severity.model';
import {EditSubjectComponent} from '../dialogs/study-plans/edit-subject/edit-subject.component';
import {PereodicSeverityService} from '../../services/lectern/pereodic-severity.service';
import {ActivatedRoute} from '@angular/router';
import {StudyPlanService} from '../../services/lectern/study-plan.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {PereodicSeverity} from '../../model/pereodic-severity.model';
import {AuthService} from '../../services/util/auth.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {NotifierService} from 'angular-notifier';
import {DeleteStudyPlanComponent} from '../dialogs/study-plans/delete-study-plan/delete-study-plan.component';
import {SeveritySubject} from '../../model/severity-subject.model';
import {PereodicSeveritySubject} from '../../model/pereodic-severity-subject.model';
import {LecternUtilityService} from '../../services/lectern/lectern-utility.service';
import {PrinterUtilityService} from '../../services/util/printer-utility.service';
import {Role} from '../../model/role.model';
import {SubmitStudyPlanComponent} from '../dialogs/study-plans/submit-study-plan/submit-study-plan.component';
import {StudyPlanStatus} from '../../model/study-plan-status.model';

@Component({
  selector: 'app-study-plan',
  templateUrl: './study-plan.component.html',
  styleUrls: ['./study-plan.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudyPlanComponent implements OnInit, AfterViewInit {


  constructor(private subjectService: SubjectService,
              private dialog: MatDialog,
              private overlay: Overlay,
              private severityService: SeverityService,
              private severityPereodicService: PereodicSeverityService,
              private authService: AuthService,
              private studyPlanService: StudyPlanService,
              private localStorageService: LocalStorageService,
              private lecternService: LecternService,
              private lecternUtilityService: LecternUtilityService,
              private notifierService: NotifierService,
              private route: ActivatedRoute,
              private printerUtilityService: PrinterUtilityService) {
  }

  // TODO refactor below one
  @ViewChild('table', {static: false}) table: MatTable<Subject>;
  @ViewChildren('table') tables: QueryList<MatTable<Subject>>;
  @ViewChild('tableMain', {static: false}) studyPlansTable: MatTable<Subject>;
  @ViewChild('tablePrototypes', {static: false}) subjectPrototypesTable: MatTable<Subject>;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  private subjects: Subject[];
  private studyPlans = null;
  private selectedStudyPlan: StudyPlan = null;
  private subjectTemplates: Subject[] = null;
  private editMode = false;
  private expandedStudyPlan: StudyPlan | null;
  private studyPlanBackup: StudyPlan;
  private lecternId: string;
  private subjectLoading;
  private studyPlansLoading;
  private severityLoading;
  private pereodicSeverityLoading;

  displayedColumnsSubjects: string[] = ['prototypes', 'add-icon'];
  displayedColumnsSingleStudyPlan: string[] = ['study-plan'];
  displayedSeverityColumnsForSubjects: string[] = [];
  displayedPereodicSeverityColumnsForSubjects: string[] = [];
  severityList: Severity[] = [];
  pereodicSeverityList: PereodicSeverity[] = [];
  templateDataSource: MatTableDataSource<Subject>;

  ngOnInit() {
    this.subjectLoading = true;
    this.studyPlansLoading = true;
    this.severityLoading = true;
    this.pereodicSeverityLoading = true;

    this.lecternId = this.route.snapshot.paramMap.get('id');
    this.lecternUtilityService.loadCurrentUser();
    this.lecternUtilityService.loadLecternToLocalStorageIfNeeded(this.lecternId);

    this.severityPereodicService.getPereodicSeverities().subscribe(pereodicSeverities => {
        this.displayedPereodicSeverityColumnsForSubjects = [];
        this.pereodicSeverityList = pereodicSeverities;
        this.pereodicSeverityList.forEach(res => this.displayedPereodicSeverityColumnsForSubjects.push(res.name));
        this.pereodicSeverityLoading = false;
      }, error => {
        this.notifierService.notify('error', 'Периодические нагрузки не были загружены! ');
        this.pereodicSeverityLoading = false;
      }
    );

    this.severityService.getSeverities().subscribe(result => {
        this.displayedSeverityColumnsForSubjects = [];
        this.severityList = result;
        this.severityList.forEach(res => this.displayedSeverityColumnsForSubjects.push(res.name));
        this.severityLoading = false;
      }, error => {
        this.notifierService.notify('error', 'Нагрузки не были загружены! ');
        this.severityLoading = false;
      }
    );

    this.studyPlanService.getStudyPlans(this.lecternId).subscribe(studyPlans => {
        this.studyPlans = studyPlans;
        for (const studyPlan of this.studyPlans) {
          this.sortSubjects(studyPlan);
        }
        this.studyPlansLoading = false;
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить учебные планы');
        this.studyPlansLoading = false;
      }
    );


    this.subjectService.getAllSubjectTemplates().subscribe(subjects => {
        this.subjectTemplates = subjects;
        this.templateDataSource = new MatTableDataSource(subjects);
        this.subjectLoading = false;
      }, error => {
        this.notifierService.notify('error', 'Не удалось загрузить шаблоны предметов');
        this.subjectLoading = false;
      }
    );
  }

  ngAfterViewInit() {
    this.editModeOff();
  }

  private sortSubjects(studyPlan: StudyPlan) {
    studyPlan.subjects.sort((a, b) => a.position - b.position);
    for (const subject of studyPlan.subjects) {
      for (const pereodicSeverity of subject.pereodicSeverities) {
        pereodicSeverity.semesterNumbers.sort((a, b) => a.number - b.number);
      }
    }
  }

  addSubjectToStudyPlan(subject: Subject) {
    const addedSubject = this.deepSubjectCopy(subject);
    // const addedSubject = JSON.parse(JSON.stringify(subject));
    addedSubject.id = null;
    addedSubject.isChanged = true;
    addedSubject.template = false;
    addedSubject.position = this.selectedStudyPlan.subjects.length + 1;

    this.selectedStudyPlan.subjects.push(addedSubject);
    this.renderCurrentStudyPlan();
  }

  getIndex(studyPlan: StudyPlan) {
    if (studyPlan === undefined) {
      return 0;
    }

    let i = -1;
    for (const studyPlanOb of this.studyPlans) {
      i++;
      if (studyPlan === null) {
        break;
      }
      if (studyPlanOb.id === studyPlan.id) {
        return i;
      }
    }
  }

  private deepSubjectCopy(subject: Subject): Subject {
    const subjectCopy: Subject = JSON.parse(JSON.stringify(subject));
    subjectCopy.severities = [];
    for (const severity of subject.severities) {
      const severityCopy: SeveritySubject = JSON.parse(JSON.stringify(severity));
      severityCopy.id = null;
      subjectCopy.severities.push(severityCopy);
    }

    subjectCopy.pereodicSeverities = [];
    for (const pereodicSeverity of subject.pereodicSeverities) {
      const pereodicSeverityCopy: PereodicSeveritySubject = JSON.parse(JSON.stringify(pereodicSeverity));
      pereodicSeverityCopy.id = null;
      pereodicSeverityCopy.semesterNumbers = [];
      subjectCopy.pereodicSeverities.push(pereodicSeverityCopy);
    }

    return subjectCopy;
  }

  deleteSubjectFromStudyPlan(subject: Subject, index: number) {
    this.selectedStudyPlan.subjects.splice(index, 1);
    for (let i = index; i < this.selectedStudyPlan.subjects.length; i++) {
      this.selectedStudyPlan.subjects[i].position = i + 1;
    }
    this.renderCurrentStudyPlan();
  }

  swapWithUpper(i: number) {
    const subjectCount = this.selectedStudyPlan.subjects.length;
    if (subjectCount === 1) {
      return;
    }

    let temp;
    if (i === 0) {
      temp = this.selectedStudyPlan.subjects[this.selectedStudyPlan.subjects.length - 1];
      this.selectedStudyPlan.subjects[subjectCount - 1] = this.selectedStudyPlan.subjects[i];
      this.selectedStudyPlan.subjects[subjectCount - 1].isChanged = true;
      this.selectedStudyPlan.subjects[subjectCount - 1].position = subjectCount;

      this.selectedStudyPlan.subjects[i] = temp;
      this.selectedStudyPlan.subjects[i].isChanged = true;
      this.selectedStudyPlan.subjects[i].position = 1;

    } else {
      temp = this.selectedStudyPlan.subjects[i - 1];

      this.selectedStudyPlan.subjects[i - 1] = this.selectedStudyPlan.subjects[i];
      this.selectedStudyPlan.subjects[i - 1].isChanged = true;
      this.selectedStudyPlan.subjects[i - 1].position = i;

      this.selectedStudyPlan.subjects[i] = temp;
      this.selectedStudyPlan.subjects[i].isChanged = true;
      this.selectedStudyPlan.subjects[i].position = i + 1;
    }

    this.renderCurrentStudyPlan();
  }

  swapWithLower(i: number) {
    const subjectCount = this.selectedStudyPlan.subjects.length;
    if (subjectCount === 1) {
      return;
    }

    let temp;
    if (i === subjectCount - 1) {
      temp = this.selectedStudyPlan.subjects[0];
      this.selectedStudyPlan.subjects[0] = this.selectedStudyPlan.subjects[i];
      this.selectedStudyPlan.subjects[0].isChanged = true;
      this.selectedStudyPlan.subjects[0].position = 1;

      this.selectedStudyPlan.subjects[i] = temp;
      this.selectedStudyPlan.subjects[i].isChanged = true;
      this.selectedStudyPlan.subjects[i].position = i + 1;

    } else {
      temp = this.selectedStudyPlan.subjects[i + 1];
      this.selectedStudyPlan.subjects[i + 1] = this.selectedStudyPlan.subjects[i];
      this.selectedStudyPlan.subjects[i + 1].isChanged = true;
      this.selectedStudyPlan.subjects[i + 1].position = i + 2;

      this.selectedStudyPlan.subjects[i] = temp;
      this.selectedStudyPlan.subjects[i].isChanged = true;
      this.selectedStudyPlan.subjects[i].position = i + 1;

    }

    this.renderCurrentStudyPlan();
  }

  editModeOn() {
    const index = this.getIndex(this.selectedStudyPlan);
    this.editMode = true;
    this.studyPlanBackup = JSON.parse(JSON.stringify(this.selectedStudyPlan));
    this.tables.toArray()[index].renderRows();
  }

  editModeOff() {
    this.editMode = false;
    this.studyPlanBackup = null;
  }

  expandRow(studyPlan: StudyPlan) {
    // const isSaveChangesNeeded = this.isSaveChangesNeededOnChangeStudyPlan();
    this.expandedStudyPlan = this.expandedStudyPlan === studyPlan ? null : studyPlan;
    if (this.selectedStudyPlan === studyPlan) {
      if (this.editMode) {
        this.declineChanges();
      }
      this.selectedStudyPlan = null;
    } else {
      if (this.editMode) {
        this.declineChanges();
      }
      this.selectedStudyPlan = studyPlan;
      this.renderTable(this.selectedStudyPlan);
    }
    console.log(this.selectedStudyPlan);
  }


  createNewStudyPlan() {
    const dialogRef = this.dialog.open(CreateStudyPlanComponent, {
      data: {message: 'Создать новый учебный план', lecternId: this.lecternId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.studyPlanService.createStudyPlan(result).subscribe(studyPlan => {
          this.studyPlans.push(studyPlan);
          this.studyPlansTable.renderRows();
          this.table.renderRows();
          this.notifierService.notify('success', 'Новый учебный план успешно добавлен');
        }, error => {
          this.notifierService.notify('error', 'Ошибка на сервере при добавлении плана');
        });
      }
    });
  }

  deleteStudyPlan() {
    const textMessage = 'Удалить учебный план';
    const dialogRef = this.dialog.open(DeleteStudyPlanComponent, {
      data: {message: textMessage, studyPlanId: this.selectedStudyPlan.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        for (let i = 0; i < this.studyPlans.length; i++) {
          if (this.studyPlans[i].id === this.selectedStudyPlan.id) {
            this.studyPlans.splice(i, 1);
            break;
          }
        }
        this.studyPlansTable.renderRows();
        this.selectedStudyPlan = null;
      }
    });
  }

  changeStudyPlan() {
    const textMessage = 'Редактировать план';
    const currentStudyPlan = this.selectedStudyPlan;

    const dialogRef = this.dialog.open(CreateStudyPlanComponent, {
      data: {message: textMessage, lecternId: this.lecternId, currentStudyPlan},
    });

    dialogRef.afterClosed().subscribe(newStudyPlan => {
      newStudyPlan = newStudyPlan as StudyPlan;
      if (newStudyPlan != null) {
        for (let i = 0; i < this.studyPlans.length; i++) {
          if (this.studyPlans[i].id === this.selectedStudyPlan.id) {
            this.studyPlans[i] = newStudyPlan;
            this.selectedStudyPlan = newStudyPlan;
          }
        }
        this.studyPlansTable.renderRows();
      }
    });
  }

  applyChanges() {
    this.editModeOff();

    // Setting isChanged to false for all subjects and study plan
    for (const studyPlan of this.studyPlans) {
      if (studyPlan.id === this.selectedStudyPlan.id) {
        studyPlan.isChanged = false;
        for (const subject of studyPlan.subjects) {
          subject.isChanged = false;
        }
        this.selectedStudyPlan = studyPlan;
      }
    }

    this.studyPlanService.editStudyPlan(this.selectedStudyPlan).subscribe(studyPlan => {
      this.renderCurrentStudyPlan();
      this.notifierService.notify('success', 'Изменения сохранены.');
    }, error => {
      this.notifierService.notify('error', 'Ошибка на сервере.');
    });

  }

  declineChanges() {
    for (let i = 0; i < this.studyPlans.length; i++) {
      if (this.studyPlans[i].id === this.selectedStudyPlan.id) {
        this.studyPlans[i] = JSON.parse(JSON.stringify(this.studyPlanBackup));
        this.selectedStudyPlan = this.studyPlans[i];
        break;
      }
    }
    this.editModeOff();
    this.renderCurrentStudyPlan();
    //  this.studyPlansTable.renderRows();
    // this.renderTable(this.selectedStudyPlan);
  }

  private renderTable(studyPlan: StudyPlan) {
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].renderRows();
    this.studyPlansTable.renderRows();
  }

  showDetails() {
    const currentStudyPlan = this.selectedStudyPlan;
    const dialogRef = this.dialog.open(StudyPlanDetailsComponent, {
      data: {currentStudyPlan}
    });
    dialogRef.afterClosed().subscribe();
  }

  getColumnsToDisplay() {
    const finalColumnsToDisplay: string[] = [];
    if (this.editMode) {
      finalColumnsToDisplay.push('swap');
      finalColumnsToDisplay.push('position');
      finalColumnsToDisplay.push('name');
      this.displayedPereodicSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      this.displayedSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      finalColumnsToDisplay.push('auditLessons');
      // finalColumnsToDisplay.push('edit-icon');
      finalColumnsToDisplay.push('delete-icon');
    } else {
      finalColumnsToDisplay.push('position');
      finalColumnsToDisplay.push('name');
      this.displayedPereodicSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      this.displayedSeverityColumnsForSubjects.forEach(res => finalColumnsToDisplay.push(res));
      finalColumnsToDisplay.push('auditLessons');
    }

    return finalColumnsToDisplay;
  }


  editSubjectFromStudyPlan(subject: Subject) {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      data: {subject, countOfSem: this.selectedStudyPlan.countOfSem},
    });

    // edit changed fields
    dialogRef.afterClosed().subscribe(newSubject => {
      if (newSubject) {
        subject.name = newSubject.name;
        subject.abbreviation = newSubject.abbreviation;
        subject.severities = newSubject.severities;
        subject.pereodicSeverities = newSubject.pereodicSeverities;
        subject.sumOfHours = newSubject.sumOfHours;
        subject.freeHours = newSubject.freeHours;
        subject.description = newSubject.description;
        subject.isChanged = true;
        subject.template = false;
      }
    });
  }

  submitStudyPlan() {
    const dialogRef = this.dialog.open(SubmitStudyPlanComponent, {
      data: {studyPlan: this.selectedStudyPlan}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.studyPlansTable.renderRows();
      }
    });
  }

  renderCurrentStudyPlan() {
    const index = this.getIndex(this.selectedStudyPlan);
    this.tables.toArray()[index].dataSource = new MatTableDataSource(this.selectedStudyPlan.subjects);
    this.tables.toArray()[index].renderRows();
  }

  isDeleteEditAddStudyPlanEnabled() {
    const userRoles = this.localStorageService.getCurrentUser().userRoles.map(userRole => userRole.role);
    return userRoles.includes(Role.ROLE_ADMIN) || userRoles.includes(Role.ROLE_LECTERN_METHODIST) || userRoles.includes(Role.ROLE_LECTERN);
  }

  isSubmitStudyPlanEnabled() {
    const userRoles = this.localStorageService.getCurrentUser().userRoles.map(userRole => userRole.role);
    return userRoles.includes(Role.ROLE_ADMIN) || userRoles.includes(Role.ROLE_LECTERN_HEAD) || userRoles.includes(Role.ROLE_LECTERN)
      || userRoles.includes(Role.ROLE_LECTERN_DEPUTY_HEAD);
  }

  isSubmitStudyPlanDisabled(): boolean {
    return this.selectedStudyPlan.status !== StudyPlanStatus.Registered;
  }

  checkIsSelected(studyPlan: StudyPlan): boolean {
    if (!this.selectedStudyPlan) {
      return false;
    }
    return this.selectedStudyPlan.id === studyPlan.id;
  }

}
