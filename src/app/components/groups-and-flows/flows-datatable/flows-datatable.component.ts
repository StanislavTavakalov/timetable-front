import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {LocalStorageService} from '../../../services/local-storage.service';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../../services/deanery/deanery.service';

@Component({
  selector: 'app-flows-datatable',
  templateUrl: './flows-datatable.component.html',
  styleUrls: ['./flows-datatable.component.css']
})
export class FlowsDatatableComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private localStorageService: LocalStorageService,
              private deaneryService: DeaneryService,
              private route: ActivatedRoute) {

  }


  ngOnInit() {


  }

  ngOnDestroy(): void {

  }

}
