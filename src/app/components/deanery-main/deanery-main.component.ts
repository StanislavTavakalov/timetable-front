import { Component, OnInit } from '@angular/core';
import {Deanery} from '../../model/deanery.model';
import {Lectern} from '../../model/lectern.model';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {HeaderType} from '../../model/header-type';

@Component({
  selector: 'app-deanery-main',
  templateUrl: './deanery-main.component.html',
  styleUrls: ['./deanery-main.component.css']
})
export class DeaneryMainComponent implements OnInit {
  deaneryId: string;
  lecterns: Lectern[] = [];
  deanery: Deanery;
  loading = true;
  loadingDeanery = true;

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private localStorageService: LocalStorageService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.localStorageService.setCurrentUserToken('Bearer ' + token);
    }
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
    if (this.deaneryId != null) {
      this.deaneryService.getLecterns(this.deaneryId).subscribe(lecterns => {
        this.lecterns = lecterns;
        this.loading = false;
      }, error2 => {
        this.loading = false;
        this.notifierService.notify('error', 'Не удалось загрузить кафедры');
      });
    }
  }

}
