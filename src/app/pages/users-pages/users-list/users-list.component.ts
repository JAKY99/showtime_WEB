import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor() { }
  columns = [
    {'pSortableColumn':'username','textHeader':'Email','columnDataName':'username','type':'string'},
    {'pSortableColumn':'fullName','textHeader':'Full Name','columnDataName':'fullName','type':'string'},
    {'pSortableColumn':'country','textHeader':'Country', 'columnDataName': 'country','type':'string'},
    {'pSortableColumn':'dateCreated','textHeader':'Date Created' , 'columnDataName': 'dateCreated' ,'type':'date'},
  ];
  path = "/management/api/v1/user/all";
  ngOnInit(): void {
  }

}
