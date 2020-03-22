import { Component, OnInit } from '@angular/core';
import {DeaneryService} from '../../services/deanery.service';
import {Lectern} from '../../model/lectern.model';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-deanery',
  templateUrl: './deanery.component.html',
  styleUrls: ['./deanery.component.css']
})
export class DeaneryComponent implements OnInit {

	users: User[] = [];
	lecterns: Lectern[] = [];

  constructor(private deaneryService: DeaneryService) { }

  ngOnInit() {
	  this.deaneryService.getUsers().subscribe(users => {
		  this.users = users;
		  this.deaneryService.getLecterns().subscribe(lecterns => {
		  this.lecterns = lecterns;
		  });
	  });
  }

}
