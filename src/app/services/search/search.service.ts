import {Injectable} from '@angular/core';
import {SearchParamsModel} from "../../models/search/searchParams";
import {FilterMetadata, LazyLoadEvent} from "primeng/api";
import {FilterPermissionModel} from "../../models/search/filters-model/filter-permission-model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  getSearchParams($event: LazyLoadEvent, filters: FilterPermissionModel): SearchParamsModel {
    return {
      first: $event.first,
      limitRow: $event.rows,
      sort: {
        sortField: $event.sortField,
        sortOrder: $event.sortOrder
      },
      filters: filters
    }
  }
}
