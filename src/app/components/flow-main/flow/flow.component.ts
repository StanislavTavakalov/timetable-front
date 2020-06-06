import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StudyPlan} from '../../../model/study-plan.model';
import {MatDialog, MatPaginator, MatSort, MatTable} from '@angular/material';
import {Flow} from '../../../model/flow.model';
import {LocalStorageService} from '../../../services/local-storage.service';
import {DeaneryService} from '../../../services/deanery/deanery.service';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {MatTableDataSource} from '@angular/material/table';
import {CreateEditFlowComponent} from '../../dialogs/create-edit-flow/create-edit-flow.component';
import {DeleteComponent} from '../../dialogs/delete/delete.component';
import {FlowService} from '../../../services/deanery/flow.service';
import {Role} from '../../../model/role.model';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  deaneryId: string;
  @Input() flows: Flow[];
  displayedColumns: string[] = ['name', 'description', 'groups', 'update', 'delete'];
  dataSource: any;
  flag: boolean;
  constructor(private localStorageService: LocalStorageService,
              private deaneryService: DeaneryService,
              private flowService: FlowService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {
    console.log(this.flows);
    this.deaneryId = this.localStorageService.observableDeanery.getValue().id;
    this.dataSource = new MatTableDataSource<Flow>(this.flows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public  addFlow() {
    const dialogRef = this.dialog.open(CreateEditFlowComponent, {
      width: '40%',
      height: '50%',
      data: {flow: null, deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result  => {
      if (result != null) {
        this.flowService.addFlow(result, this.deaneryId).subscribe( flow => {
          this.flowService.editFlow(flow).subscribe( flowR => {
            this.flows.push(flowR);
            this.dataSource.data = this.flows;
            this.dataSource.paginator = this.paginator;
            this.table.renderRows();
            this.notifierService.notify('success', 'Поток успешно создан');
          });
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  public deleteFlow(flowO: Flow) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '25%',
      height: '25%',
      data: {},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.flowService.deleteFlow(flowO.id).subscribe(flow => {
          this.flows.splice(this.flows.indexOf(flowO), 1);
          this.dataSource.data = this.flows;
          this.table.renderRows();
          this.notifierService.notify('success', 'Поток успешно удален');
          });
        }
      }
    });
  }

  public updateFlow(flowO) {
    const dialogRef = this.dialog.open(CreateEditFlowComponent, {
      width: '40%',
      height: '50%',
      data: {flow: JSON.parse(JSON.stringify(flowO)), deaneryId: this.deaneryId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result  => {
      if (result != null) {
        this.flowService.editFlow(result).subscribe( flow => {
          this.updateGroups(flowO, result);
          this.flows[this.flows.indexOf(flowO)] = flow;
          this.dataSource.data = this.flows;
          this.table.renderRows();
          this.notifierService.notify('success', 'Поток успешно изменен');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  updateGroups(flowOld: Flow, flowNew: Flow) {
    flowOld.groups.forEach((groupOld) => {
      this.flag  = false;
      flowNew.groups.forEach((groupNew) => {
        if (groupNew.id === groupOld.id) {
          this.flag = true;
        }
      });
      if (!this.flag) {
        console.log(groupOld);
        this.flowService.editGroupSetNullFlow(groupOld).subscribe();
      }
    });
  }

  isDeleteEditAddSFlowEnabled() {
    const userRoles = this.localStorageService.getCurrentUser().userRoles.map(userRole => userRole.role);
    return userRoles.includes(Role.ROLE_DEANERY_DEPUTY_HEAD) || userRoles.includes(Role.ROLE_ADMIN) || userRoles.includes(Role.ROLE_DEANERY_METHODIST) || userRoles.includes(Role.ROLE_DEANERY);
  }
}
