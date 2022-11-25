import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PermissionModel} from "../../../models/Authorities/permission-model";
import {ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService} from "primeng/api";
import {PermissionService} from "../../../services/authorities/permission.service";
import {SearchParamsModel} from "../../../models/search/searchParams";
import {SearchService} from "../../../services/search/search.service";
import {
  PermissionAddDialogComponent
} from "../../../components/permission/permission-add-dialog/permission-add-dialog.component";
import {
  PermissionEditDialogComponent
} from "../../../components/permission/permission-edit-dialog/permission-edit-dialog.component";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService]
})
export class PermissionListComponent implements OnInit {

  @ViewChild('newPermissionDialogRef') newPermissionDialogChild: PermissionAddDialogComponent | undefined;
  @ViewChild('editPermissionDialogRef') editPermissionDialogChild: PermissionEditDialogComponent | undefined;

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

  constructor(private permissionService: PermissionService, private searchService: SearchService,
              private confirmationService: ConfirmationService, private messageService: MessageService) {
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

  showEditPermissionDialog(permissionId: number) {
    this.editPermissionDialogChild?.showDialog(permissionId);
  }

  showDeletePermissionDialog(permissionId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: async () => {
        await this.permissionService.deletePermission(permissionId).toPromise().then(() => {
          this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
          this.search(this.searchParams);
        })
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
      }
    });
  }

}
