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
  flowId: string;
  displayedColumns: string[] = ['name', 'description', 'count', 'speciality', 'update', 'delete'];
  dataSource: any;
  lecternId: string;

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.flowId = this.route.snapshot.paramMap.get('idFlow');
    this.lecternId = this.route.snapshot.paramMap.get('idLectern');
    if (this.flowId !== null) {
      this.deaneryService.getGroupsByFlowId(this.flowId).subscribe(groups => {
        this.groups = groups;
        this.dataSource = new MatTableDataSource<Group>(this.groups);
        this.dataSource.paginator = this.paginator;
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить группы');
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addGroup() {
    const dialogRef = this.dialog.open(CreateEditGroupComponent, {
      width: '30%',
      height: '60%',
      data: {group: null, flowId: this.flowId, lecternId: this.lecternId},
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
      width: '30%',
      height: '30%',
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
      width: '30%',
      height: '60%',
      data: {group: JSON.parse(JSON.stringify(groupO)), flowId: null, lecternId: this.lecternId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result);
        this.groups[this.groups.indexOf(groupO)] = result;
        this.dataSource.data = this.groups;
        this.table.renderRows();
        this.notifierService.notify('success', 'Группа успешно изменена');
      }
    });
  }

}
