import { Component, OnInit } from '@angular/core';
import * as moment from "moment/moment";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
 gridApi: any;
  constructor() {
  }

  columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      sortable: true,
      checkboxSelection: true,
      formAdd: false,
      formEdit: false,
      filter: true,
      floatingFilter: true
    },
    {
      'field': 'role',
      headerName: 'Role',
      type: 'text',
      formAdd: true,
      formEdit: true,
      requiredAdd: true,
      requiredEdit: true,
      filter: true,
      floatingFilter: true
    },
    {
      'field': 'display_name',
      headerName: 'Displayed name',
      type: 'text',
      formAdd: false,
      formEdit: true,
      requiredAdd: true,
      requiredEdit: true,
      filter: true,
      floatingFilter: true
    },
    // @ts-ignore
    {
      'field': 'permissions',
      headerName: 'Permissions',
      type: 'text',
      formAdd: false,
      formEdit: true,
      requiredAdd: false,
      requiredEdit: false,
      // editable: true,
      // cellEditor: 'agLargeTextCellEditor',
      // cellEditorPopup: true,
      // cellEditorParams: {
      //   maxLength: '300',
      //   cols: '50',
      //   rows: '6',
      // },
      filter: true,
      floatingFilter: true,
      width: 1000
    },
    {
      'field': 'description',
      headerName: 'Description',
      type: 'text',
      formAdd: true,
      formEdit: true,
      requiredAdd: true,
      requiredEdit: true,
      filter: true,
      floatingFilter: true
    },
  ];
  path = "/api/v1/role/aggrid/all";
  pathAdd = "/api/v1/role/aggrid/add";
  pathEdit = "/api/v1/role/aggrid/edit";
  pathDelete = "/api/v1/role/aggrid/delete";
  addDialogTitle = "Add Role";
  editDialogTitle = "Edit Role";
  deleteDialogTitle = "Delete Role";

  ngOnInit(): void {

  }

}
