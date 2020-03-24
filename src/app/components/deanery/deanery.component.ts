import { Component, OnInit } from '@angular/core';
import {DeaneryService} from '../../services/deanery.service';
import {Lectern} from '../../model/lectern.model';
import {User} from '../../model/user.model';
import {ActivatedRoute} from '@angular/router';
import {Deanery} from '../../model/deanery.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {HeaderType} from '../../model/header-type';

@Component({
  selector: 'app-deanery',
  templateUrl: './deanery.component.html',
  styleUrls: ['./deanery.component.css']
})
export class DeaneryComponent implements OnInit {

  deaneryId: string;
  users: User[] = [];
  lecterns: Lectern[] = [];
  deanery: Deanery;

  constructor(private route: ActivatedRoute,
              private deaneryService: DeaneryService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.deaneryId = this.route.snapshot.paramMap.get('id');
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== this.deaneryId) {
      this.deaneryService.getDeaneryById(this.deaneryId).subscribe(value => {
        this.deanery = value;
        this.localStorageService.observableDeanery.next(this.deanery);
        this.localStorageService.observableHeaderType.next(HeaderType.DEANERY);
      });
    }
    if (this.deaneryId != null) {
      this.deaneryService.getUsers().subscribe(users => {
        this.users = users;
        this.deaneryService.getLecterns(this.deaneryId).subscribe(lecterns => {
          this.lecterns = lecterns;
        });
      });
    }
  }

}
