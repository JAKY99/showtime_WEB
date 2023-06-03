import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegexFieldValidator} from "../../common/validators/RegexFieldValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import * as moment from "moment/moment";

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {

  constructor() { }
  columnDefs = [
    {headerName: 'ID', field: 'id', sortable: true, checkboxSelection: true,formAdd:false,formEdit:false,filter: true, floatingFilter: true},
    {'field':'message',headerName:'Message',type:'email',formAdd:false,formEdit:true,requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'severity',headerName:'Severity',type:'text', formAdd:false,formEdit:true, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'type',headerName:'Type',type:'text', formAdd:false,formEdit:true, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'receiverName',headerName:'Reciever',type:'text', formAdd:false,formEdit:false, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'dateRead',headerName:'Date Read',type:'date',formAdd:true,formEdit:false,requiredAdd:false, requiredEdit:false,filter: true, floatingFilter: true, cellRenderer: (data: { value: any; }) => {
        return moment(data.value).format("MMM Do YYYY"); }
    },
    {'field':'dateCreated',headerName:'Date creation',type:'date',formAdd:true,formEdit:false,requiredAdd:false, requiredEdit:false,filter: true, floatingFilter: true, cellRenderer: (data: { value: any; }) => {
        return moment(data.value).format("MMM Do YYYY"); }
    },
  ];
  path = "/management/api/v1/user/notification/aggrid/all";
  pathAdd = "/management/api/v1/user/notification/aggrid/add";
  pathEdit = "/management/api/v1/user/notification/aggrid/edit";
  pathDelete = "/management/api/v1/user/notification/aggrid/delete";
  addDialogTitle = "Add Notification";
  editDialogTitle = "Edit Notification";
  deleteDialogTitle = "Delete Notification";
  ngOnInit(): void {
  }
}
