import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import {Teacher} from '../../../model/teacher.model';
import {DeaneryService} from '../../../services/deanery/deanery.service';
import {MatTableDataSource} from '@angular/material/table';
import {StaffType} from '../../../model/staff-type.model';
import {TeacherService} from '../../../services/lectern/teacher.service';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'surname', 'patronymic', 'position', 'academicRank',
    'academicDegree', 'staffType'];
  dataSource: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<TeacherViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.getTeachersByLecternId(this.data.lectern).subscribe(teachers => {
      this.dataSource = new MatTableDataSource<Teacher>(teachers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private printAcademicDegree(academicDegree, abbreviation) {
    if (academicDegree && academicDegree !== '') {
      if (abbreviation) {
        return academicDegree + ' (' + abbreviation + ') ';
      } else {
        return academicDegree;
      }
    } else {
      return 'Не указано';
    }
  }

  private printValue(value) {
    return value === null || value === '' ? 'Не указано' : value;
  }

  private printStaffType(staffType: StaffType, rate: number): string {
    switch (staffType) {
      case StaffType.ExternalCombiner:
        return 'Внешний совместитель' + ' (Ставка: ' + rate + ')';
      case StaffType.FullTime:
        return 'Штатный';
      case StaffType.PartTime:
        return 'Почасовик' + ' (Часов: ' + rate + ')';
      case StaffType.InternalCombiner:
        return 'Внутренний совместитель' + ' (Ставка: ' + rate + ')';
      case staffType:
        return 'Не указано';
    }
  }

}
