import {Component, OnInit} from '@angular/core';
import {PermissionModel} from "../../../models/Authorities/permission-model";
import {LazyLoadEvent} from "primeng/api";
import {PermissionService} from "../../../services/authorities/permission.service";
import {SearchParamsModel} from "../../../models/search/searchParams";
import {SearchService} from "../../../services/search/search.service";
import {FilterPermissionModel} from "../../../models/search/filters-model/filter-permission-model";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {

  // @ts-ignore
  permissions: PermissionModel[] = [];

  first = 0;
  rows = 10;
  totalRecords: number = 0;
  // @ts-ignore
  loading: boolean = true;
  filters: FilterPermissionModel = {
    permissions: {
      matchMode: null,
      value: []
    },
    description: {
      matchMode: null,
      value: null
    },
    displayName: {
      matchMode: null,
      value: null
    }
  }
  searchParams: SearchParamsModel = {
    first: this.first,
    limitRow: this.rows,
    sort: {
      sortField: null,
      sortOrder: null
    },
    filters: this.filters
  }

  constructor(private permissionService: PermissionService, private searchService: SearchService) {
  }

  ngOnInit() {
    this.search(this.searchParams).then();
  }

  async loadPermissions($event: LazyLoadEvent) {
    let filters = this.setSearchParamsFilters($event);
    console.log(filters);
    await this.search(this.searchService.getSearchParams($event,filters));
    this.loading = false;
  }

  async search(searchParams: SearchParamsModel) {
    await this.permissionService.getPermissions(searchParams).toPromise()
      .then(res => {
        this.permissions = res.listOfResults;
        this.totalRecords = res.totalRecords;
      })
      .catch(err => {
        console.log(err)
      })
  }

  setSearchParamsFilters($event: LazyLoadEvent) {
    let filters = $event.filters;
    return {
      permissions: {
        matchMode: filters?.permission?.matchMode,
        value: filters?.permission?.value
      },
      description: {
        matchMode: filters?.description?.matchMode,
        value: filters?.description?.value
      },
      displayName: {
        matchMode: filters?.display_name?.matchMode,
        value: filters?.display_name?.value
      }
    }
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


}
