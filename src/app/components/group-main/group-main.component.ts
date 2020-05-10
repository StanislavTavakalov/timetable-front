import { Component, OnInit } from '@angular/core';
import {Group} from '../../model/group.model';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-group-main',
  templateUrl: './group-main.component.html',
  styleUrls: ['./group-main.component.css']
})
export class GroupMainComponent implements OnInit {
  loading = true;
  deaneryId: string;
  groups: Group[] = [];

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    if (this.deaneryId !== null) {
      this.deaneryService.getGroupsByFlowId(this.deaneryId).subscribe(groups => {
        this.loading = false;
        this.groups = groups;
      }, error2 => {
        this.loading = false;
        this.notifierService.notify('error', 'Не удалось загрузить группы');
      });
    }
  }

}
