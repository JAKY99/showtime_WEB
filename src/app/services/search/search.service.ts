import {Injectable} from '@angular/core';
import {SearchParamsModel} from "../../models/search/searchParams";
import {LazyLoadEvent} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() {
  }

  getSearchParams($event: LazyLoadEvent): SearchParamsModel {
    return {
      // @ts-ignore
      pageNumber: Math.round($event.first / $event.rows),
      limitRow: $event.rows,
      sort: {
        sortField: $event.sortField,
        sortOrder: $event.sortOrder
      },
      filters: $event.filters
    }
  }
}
