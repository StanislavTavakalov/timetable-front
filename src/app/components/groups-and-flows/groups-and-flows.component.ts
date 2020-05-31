import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {NotifierService} from 'angular-notifier';
import {LecternUtilityService} from '../../services/lectern/lectern-utility.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {GroupService} from '../../services/deanery/group.service';
import {FlowService} from '../../services/deanery/flow.service';
import {Group} from '../../model/group.model';
import {Flow} from '../../model/flow.model';

@Component({
  selector: 'app-groups-and-flows',
  templateUrl: './groups-and-flows.component.html',
  styleUrls: ['./groups-and-flows.component.css']
})
export class GroupsAndFlowsComponent implements OnInit, OnDestroy {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private notifierService: NotifierService,
              private flowService: FlowService,
              private groupService: GroupService,
              private lecternUtilityService: LecternUtilityService,
              private route: ActivatedRoute) {

  }

  groups: Group[];
  flows: Flow[];
  groupServiceSubscription: Subscription;
  flowServiceSubscription: Subscription;
  groupsTableVisible = false;
  flowsTableVisible = false;
  isGroupsLoading = false;
  isFlowsLoading = false;

  ngOnInit() {
    this.isGroupsLoading = true;
    this.isFlowsLoading = true;

    const lecternId = this.route.snapshot.paramMap.get('id');
    this.lecternUtilityService.loadLecternToLocalStorageIfNeeded(lecternId);

    this.groupServiceSubscription = this.groupService.getGroupsByLecternId(lecternId).subscribe(groups => {
      console.log(groups);
      this.isGroupsLoading = false;
      this.groups = groups;
      this.groupsTableVisible = true;
    }, error => {
      this.isGroupsLoading = false;
      this.groupsTableVisible = true;
      this.notifierService.notify('error', 'Не удалось загрузить учебные группы.');
    });

    this.flowServiceSubscription = this.flowService.getFlowsByLecternId(lecternId).subscribe(flows => {
      console.log(flows);
      this.isFlowsLoading = false;
      this.flows = flows;
      this.flowsTableVisible = true;
    }, error => {
      this.isFlowsLoading = false;
      this.flowsTableVisible = true;
      this.notifierService.notify('error', 'Не удалось загрузить учебные потоки.');
    });
  }

  ngOnDestroy(): void {
    if (this.groupServiceSubscription) {
      this.groupServiceSubscription.unsubscribe();
    }

    if (this.flowServiceSubscription) {
      this.flowServiceSubscription.unsubscribe();
    }
  }
}
