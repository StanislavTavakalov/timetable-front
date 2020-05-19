import { Component, OnInit } from '@angular/core';
import {Employee} from '../../model/employee.model';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {NotifierService} from 'angular-notifier';
import {Deanery} from '../../model/deanery.model';
import {HeaderType} from '../../model/header-type';
import {LocalStorageService} from '../../services/local-storage.service';


@Component({
  selector: 'app-deanery-staff-main',
  templateUrl: './deanery-staff-main.component.html',
  styleUrls: ['./deanery-staff-main.component.css']
})
export class DeaneryStaffMainComponent implements OnInit {
  deaneryId: string;
  employees: Employee[] = [];
  loading = true;
  loadingDeanery = true;
  deanery: Deanery;
  constructor(private deaneryService: DeaneryService,
              private route: ActivatedRoute,
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
    if (this.deaneryId != null) {
      this.deaneryService.getEmployeesByDeneryId(this.deaneryId).subscribe(employees => {
        this.employees = employees;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.notifierService.notify('error', 'Не удалось загрузить сотрудников');
      });
    }
  }

}
