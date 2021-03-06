import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery/deanery.service';
import {NotifierService} from 'angular-notifier';
import {Flow} from '../../model/flow.model';
import {HeaderType} from '../../model/header-type';
import {LocalStorageService} from '../../services/local-storage.service';
import {Deanery} from '../../model/deanery.model';
import {FlowService} from '../../services/deanery/flow.service';

@Component({
  selector: 'app-flow-main',
  templateUrl: './flow-main.component.html',
  styleUrls: ['./flow-main.component.css']
})
export class FlowMainComponent implements OnInit {
  deaneryId: string;
  flows: Flow[] = [];
  loading = true;
  loadingDeanery = true;
  deanery: Deanery;
  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private flowService: FlowService,
              private localStorageService: LocalStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    this.localStorageService.observableHeaderType.next(HeaderType.DEANERY);
    if (this.localStorageService.observableDeanery.getValue() === null ||
      this.localStorageService.observableDeanery.getValue().id !== this.deaneryId) {
      this.deaneryService.getDeaneryById(this.deaneryId).subscribe(value => {
        this.deanery = value;
        this.localStorageService.observableDeanery.next(this.deanery);
        this.loadingDeanery = false;
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить деканат');
      });
    } else {
      this.loadingDeanery = false;
    }
    this.flowService.getFlowsByDeaneryId(this.deaneryId).subscribe(flows => {
      this.flows = flows;
      console.log(this.flows);
      this.loading = false;
    }, error2 => {
      this.loading = false;
      this.notifierService.notify('error', 'Не удалось загрузить потоки');
    });
  }

}
