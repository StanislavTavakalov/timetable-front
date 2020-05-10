import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Group} from '../../../model/group.model';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../../services/deanery.service';
import {StudyPlan} from '../../../model/study-plan.model';
import {MatDialog, MatPaginator, MatTable} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {CreateEditGroupComponent} from '../../dialogs/create-edit-group/create-edit-group.component';
import {DeleteComponent} from '../../dialogs/delete/delete.component';
import {LocalStorageService} from '../../../services/local-storage.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  @Input() groups: Group[];
  groupsFilter: Group[] = [];
  displayedColumns: string[] = ['name', 'description', 'count', 'speciality', 'flow', 'lectern' , 'update', 'delete'];
  dataSource: any;
  deaneryId: string;

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private dialog: MatDialog, private overlay: Overlay,
              private localStorageService: LocalStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId =  this.localStorageService.observableDeanery.getValue().id;
    this.dataSource = new MatTableDataSource<Group>(this.groups);
    this.dataSource.paginator = this.paginator;
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
        this.deaneryService.addGroup(result.group, result.flowId).subscribe( group => {
          this.groups.push(group);
          this.dataSource.data = this.groups;
          this.table.renderRows();
          this.notifierService.notify('success', 'Группа успешно создана');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  deleteGroup(groupO) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '25%',
      height: '25%',
      data: {groupId: groupO.id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.deaneryService.deleteGroup(groupO.id).subscribe(group => {
            this.groups.splice(this.groups.indexOf(groupO), 1);
            this.dataSource.data = this.groups;
            this.table.renderRows();
            this.notifierService.notify('success', 'Группа успешно удалена');
          });
        }
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
        this.deaneryService.editGroup(result.group).subscribe( group => {
          this.groups[this.groups.indexOf(groupO)] = group;
          this.dataSource.data = this.groups;
          this.table.renderRows();
          this.notifierService.notify('success', 'Группа успешно изменена');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }
}