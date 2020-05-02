import {Component, OnInit, ViewChild} from '@angular/core';
import {StudyPlan} from '../../model/study-plan.model';
import {MatDialog, MatPaginator, MatTable} from '@angular/material';
import {Flow} from '../../model/flow.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {DeaneryService} from '../../services/deanery.service';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {CreateEditFlowComponent} from '../dialogs/create-edit-flow/create-edit-flow.component';
import {DeleteComponent} from '../dialogs/delete/delete.component';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: false}) table: MatTable<StudyPlan>;
  deaneryId: string;
  lecternId: string;
  flows: Flow[] = [];
  displayedColumns: string[] = ['name', 'description', 'update', 'delete'];
  dataSource: any;
  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private dialog: MatDialog, private overlay: Overlay,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    this.lecternId = this.route.snapshot.paramMap.get('idLectern');
    this.deaneryService.getFlowsByLecternId(this.lecternId).subscribe(flows => {
      this.flows = flows;
      this.dataSource = new MatTableDataSource<Flow>(flows);
      this.dataSource.paginator = this.paginator;
    }, error2 => {
      this.notifierService.notify('error', 'Не удалось загрузить потоки');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public  addFlow() {
    const dialogRef = this.dialog.open(CreateEditFlowComponent, {
      width: '20%',
      height: '35%',
      data: {flow: null, lecternId: this.lecternId},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result  => {
      if (result != null) {
        this.deaneryService.addFlow(result, this.lecternId).subscribe( flow => {
          this.flows.push(flow);
          this.dataSource.data = this.flows;
          this.dataSource.paginator = this.paginator;
          this.table.renderRows();
          this.notifierService.notify('success', 'Поток успешно создан');
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }

  public deleteFlow(flowO) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '25%',
      height: '25%',
      data: {flowId: flowO.id},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result) {
          this.deaneryService.deleteFlow(flowO.id).subscribe(flow => {
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
      width: '20%',
      height: '35%',
      data: {flow: JSON.parse(JSON.stringify(flowO)), lecternId: null},
      scrollStrategy: this.overlay.scrollStrategies.noop()
    }) ;
    dialogRef.afterClosed().subscribe(result  => {
      if (result != null) {
        this.deaneryService.addFlow(result, this.lecternId).subscribe( flow => {
          this.flows[this.flows.indexOf(flowO)] = flow;
          this.dataSource.data = this.flows;
          this.table.renderRows();
        }, error2 => {
          this.notifierService.notify('error', error2);
        });
      }
    });
  }
}
