import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group.model';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {NotifierService} from 'angular-notifier';
import {LocalStorageService} from '../../services/local-storage.service';
import {HeaderType} from '../../model/header-type';
import {Deanery} from '../../model/deanery.model';

@Component({
  selector: 'app-group-main',
  templateUrl: './group-main.component.html',
  styleUrls: ['./group-main.component.css']
})
export class GroupMainComponent implements OnInit {
  loading = true;
  deaneryId: string;
  groups: Group[] = [];
  deanery: Deanery;

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
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
        console.log(this.deanery);
      }, error2 => {
        this.notifierService.notify('error', 'Не удалось загрузить деканат');
      });
    }
    if (this.deaneryId !== null) {
      this.deaneryService.getGroupsByDeaneryId(this.deaneryId).subscribe(groups => {
        this.loading = false;
        this.groups = groups;
      }, error2 => {
        this.loading = false;
        this.notifierService.notify('error', 'Не удалось загрузить группы');
      });
    }
  }

}
