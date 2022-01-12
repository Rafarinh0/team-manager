import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  showRegister = false;
  showEdit = false;
  showSuccess = false;
  constructor() { }

  ngOnInit(): void {
  }

}
