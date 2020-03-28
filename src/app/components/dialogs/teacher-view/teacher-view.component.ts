import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator} from '@angular/material';
import {FormForCreationComponent} from '../../form-for-creation/form-for-creation.component';
import {Teacher} from '../../../model/teacher.model';
import {DeaneryService} from '../../../services/deanery.service';
import {Lectern} from '../../../model/lectern.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.css']
})
export class TeacherViewComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  teachers: Teacher[] = [];
  displayedColumns: string[] = ['name', 'patronymic', 'surname', 'position', 'rank', 'academicDegree'];
  dataSource: any;

  constructor(public dialogRef: MatDialogRef<TeacherViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private deaneryService: DeaneryService) { }

  ngOnInit() {
    this.deaneryService.getTeachersByLecternId(this.data.lectern).subscribe(teachers => {
      this.dataSource = new MatTableDataSource<Teacher>(teachers);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
