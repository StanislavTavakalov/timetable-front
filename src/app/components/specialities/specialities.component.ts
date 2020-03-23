import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Overlay} from '@angular/cdk/overlay';
import {LocalStorageService} from '../../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpecialityService} from '../../services/lectern/speciality.service';
import {LecternService} from '../../services/lectern/lectern.service';
import {HeaderType} from '../../model/header-type';
import {Lectern} from '../../model/lectern.model';

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private localStorageService: LocalStorageService,
              private specialistService: SpecialityService,
              private lecternService: LecternService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  lectern: Lectern;

  ngOnInit() {
    // setting lectern id when we get to this Lectern section
    const lecternId = this.route.snapshot.paramMap.get('id');

    // loading of Lectern if it is null or id changed
    if (this.localStorageService.observableLectern.getValue() === null ||
      this.localStorageService.observableLectern.getValue().id !== lecternId) {
      this.lecternService.getLecternById(lecternId).subscribe(value => {
        this.lectern = value;
        this.localStorageService.observableLectern.next(this.lectern);
        console.log(this.lectern);
      });
    }
  }


}
