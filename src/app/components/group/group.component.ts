import {Component, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../model/group.model';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {StudyPlan} from '../../model/study-plan.model';
import {MatDialog, MatPaginator, MatTable} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {CreateEditGroupComponent} from '../dialogs/create-edit-group/create-edit-group.component';
import {DeleteGroupComponent} from '../dialogs/delete-group/delete-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  groups: Group[] = [];
  groupsFilter: Group[] = [];
  displayedColumns: string[] = ['name', 'description', 'count', 'speciality', 'flow', 'lectern' , 'update', 'delete'];
  dataSource: any;
  deaneryId: string;

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    if (this.deaneryId !== null) {
      this.deaneryService.getGroupsByFlowId(this.deaneryId).subscribe(groups => {
        this.groups = groups;
        this.dataSource = new MatTableDataSource<Group>(this.groups);
        this.dataSource.paginator = this.paginator;
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить группы');
      });
    }
  }

  applyFilter(event: Event) {
    this.groupsFilter = [];
    const filterValue = (event.target as HTMLInputElement).value;
    this.groups.forEach(group => {
      if (group.name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          group.description.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          group.countOfStudents.toString().toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          group.flow.name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1 ||
          group.flow.lectern.name.toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
        this.groupsFilter.push(group);
      }
    });
    this.dataSource.data = this.groupsFilter;
  }

  addGroup() {
    const dialogRef = this.dialog.open(CreateEditGroupComponent, {
      width: '25%',
      height: '65%',
      data: {group: null, deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.groups.push(result);
        this.dataSource.data = this.groups;
        this.table.renderRows();
        this.notifierService.notify('success', 'Группа успешно создана');
      }
    });
  }

  deleteGroup(groupO) {
    const dialogRef = this.dialog.open(DeleteGroupComponent, {
      width: '25%',
      height: '25%',
      data: {groupId: groupO.id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.groups.splice(this.groups.indexOf(groupO), 1);
        this.dataSource.data = this.groups;
        this.table.renderRows();
        this.notifierService.notify('success', 'Группа успешно удалена');
      }
    });
  }

  updateGroup(groupO) {
    const dialogRef = this.dialog.open(CreateEditGroupComponent, {
      width: '25%',
      height: '65%',
      data: {group: JSON.parse(JSON.stringify(groupO)), deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.groups[this.groups.indexOf(groupO)] = result;
        this.dataSource.data = this.groups;
        this.table.renderRows();
        this.notifierService.notify('success', 'Группа успешно изменена');
      }
    });
  }

}
