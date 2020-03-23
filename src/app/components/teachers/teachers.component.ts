import { Component, OnInit } from '@angular/core';
import {HeaderType} from '../../model/header-type';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

}
