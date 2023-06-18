import {Component, OnInit, ViewChild} from '@angular/core';
import {
  PermissionAddDialogComponent
} from "../../../components/permission/permission-add-dialog/permission-add-dialog.component";
import {
  PermissionEditDialogComponent
} from "../../../components/permission/permission-edit-dialog/permission-edit-dialog.component";
import * as moment from "moment";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor() { }
  columnDefs = [
    {headerName: 'ID', field: 'id', sortable: true, checkboxSelection: true,formAdd:false,formEdit:false,filter: true, floatingFilter: true},
    {'field':'username',headerName:'Email',type:'email',formAdd:true,formEdit:false,requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'password',hide:true ,headerName:'password',type:'password', formAdd:true,formEdit:false, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'fullName',headerName:'Full Name',type:'text', formAdd:false,formEdit:false, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    // @ts-ignore
    {'field':'role', headerName:'Role',type:'select',defaultOptionOnCreate:{"name":"display_name","value":"User"}, optionsListUrl:"/api/v1/role/all",valueNameToUseInOption:"id",optionNameToDisplay:"display_name", formAdd:true,formEdit:true, requiredAdd:true, requiredEdit:true , cellRenderer: (params) => {
        return params.value.display_name;
      },filter: true, floatingFilter: true},
    {'field':'firstName',hide:true,headerName:'Firstname',type:'text', formAdd:true,formEdit:true, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'lastName',hide:true,headerName:'Lastname',type:'text', formAdd:true,formEdit:true, requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'country',headerName:'Country',type:'text',formAdd:true,formEdit:true,requiredAdd:true, requiredEdit:true,filter: true, floatingFilter: true},
    {'field':'dateCreated',headerName:'Date creation',type:'date',formAdd:false,formEdit:false,requiredAdd:false, requiredEdit:false,filter: true, floatingFilter: true, cellRenderer: (data: { value: any; }) => {
        return moment(data.value).format("MMM Do YY"); }
    },
  ];
  path = "/management/api/v1/user/aggrid/all";
  pathAdd = "/management/api/v1/user/aggrid/add";
  pathEdit = "/management/api/v1/user/aggrid/edit";
  pathDelete = "/management/api/v1/user/aggrid/delete";
  addDialogTitle = "Add User";
  editDialogTitle = "Edit User";
  deleteDialogTitle = "Delete User";
  ngOnInit(): void {
  }

}
