import { Component, OnInit } from '@angular/core';
import {Employee} from '../../model/employee.model';
import {ActivatedRoute} from '@angular/router';
import {DeaneryService} from '../../services/deanery.service';
import {NotifierService} from 'angular-notifier';


@Component({
  selector: 'app-deanery-staff-main',
  templateUrl: './deanery-staff-main.component.html',
  styleUrls: ['./deanery-staff-main.component.css']
})
export class DeaneryStaffMainComponent implements OnInit {
  deaneryId: string;
  employees: Employee[] = [];
  loading = true;
  constructor(private deaneryService: DeaneryService,
              private route: ActivatedRoute,
              private notifierService: NotifierService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
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
