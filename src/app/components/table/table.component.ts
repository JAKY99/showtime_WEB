import {Component, Input, OnInit} from '@angular/core';
import {SearchParamsModel} from "../../models/search/searchParams";
import {SearchService} from "../../services/search/search.service";
import {ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService} from "primeng/api";
import {formatDate} from "@angular/common";
// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { TableService } from "../../services/table/table.service";
@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() path: string | undefined;
  @Input() columns: any[] | undefined;

  // @ts-ignore
  elementList: any = {};
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

  url = 'http://localhost:8082/websocket'
  client: any;
  greeting: string | undefined;
  constructor(private searchService : SearchService, private tableService : TableService , ) {
    this.searchService = searchService;
    this.tableService = tableService;
    this.connection();
  }
  formatDate(date: Date) {
    formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
  ngOnInit() {
    this.search(this.searchParams).then();
  }

  async loadData($event: LazyLoadEvent) {
    this.loading = true;
    this.searchParams.pageNumber = $event.first;
    this.searchParams.limitRow = $event.rows;
    this.searchParams.sort.sortField = $event.sortField;
    this.searchParams.sort.sortOrder = $event.sortOrder;
    this.searchParams.filters = $event.filters;
    await this.search(this.searchService.getSearchParams($event));
    this.loading = false;
  }


  async search(searchParams: SearchParamsModel) {
    this.loading = true;

    await this.tableService.getList(searchParams,this.path).toPromise()
      // @ts-ignore
      .then(res => {
        this.elementList = res.listOfResults;
        this.totalRecords = res.totalRecords;
      })
      // @ts-ignore
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

  showDialog() {

  }

  showEditDialog(permissionId: number) {

  }

  showDeleteDialog(permissionId: number) {

  }
  connection(){
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;

    // @ts-ignore
    this.client.connect({}, function(frame) {
      // @ts-ignore
      that.client.subscribe("/topic/admin", (message) => {
        if(message.body) {
          that.greeting = message.body;
          that.search(that.searchParams);
        }
      });
    });
  }
}
