import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {MatDialog} from '@angular/material';
import {NotifierService} from 'angular-notifier';
import {Overlay} from '@angular/cdk/overlay';
import {Flow} from '../../model/flow.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-flow-main',
  templateUrl: './flow-main.component.html',
  styleUrls: ['./flow-main.component.css']
})
export class FlowMainComponent implements OnInit {
  deaneryId: string;
  lecternId: string;
  flows: Flow[] = [];
  loading = true;
  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    this.lecternId = this.route.snapshot.paramMap.get('idLectern');
    this.deaneryService.getFlowsByLecternId(this.lecternId).subscribe(flows => {
      this.loading = false;
      this.flows = flows;
    }, error2 => {
      this.loading = false;
      this.notifierService.notify('error', 'Не удалось загрузить потоки');
    });
  }

}
