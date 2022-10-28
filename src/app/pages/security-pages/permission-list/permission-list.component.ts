import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PermissionModel} from "../../../models/Authorities/permission-model";
import {LazyLoadEvent} from "primeng/api";
import {PermissionService} from "../../../services/authorities/permission.service";
import {SearchParamsModel} from "../../../models/search/searchParams";
import {SearchService} from "../../../services/search/search.service";
import {
  PermissionDialogComponent
} from "../../../components/permission/permission-dialog/permission-dialog.component";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PermissionListComponent implements OnInit {

  @ViewChild('newPermissionDialogRef') newPermissionDialogChild: PermissionDialogComponent | undefined;

  // @ts-ignore
  permissions: PermissionModel[] = [];

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  // @ts-ignore
  loading: boolean = true;

  searchParams: SearchParamsModel = {
    pageNumber: this.first,
    limitRow: this.rows,
    sort: {
      sortField: null,
      sortOrder: null
    },
    filters: null
  }

  constructor(private permissionService: PermissionService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.search(this.searchParams).then();
  }

  async loadPermissions($event: LazyLoadEvent) {
    await this.search(this.searchService.getSearchParams($event));
  }

  async search(searchParams: SearchParamsModel) {
    this.loading = true;
    await this.permissionService.getPermissions(searchParams).toPromise()
      .then(res => {
        this.permissions = res.listOfResults;
        this.totalRecords = res.totalRecords;
      })
      .catch(err => {
        console.log(err)
      })
    this.loading = false;
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  // @ts-ignore
  isLastPage(): boolean {
  }

  // @ts-ignore
  isFirstPage(): boolean {
  }

  showNewPermissionDialog() {
    this.newPermissionDialogChild?.showDialog();
  }

}
