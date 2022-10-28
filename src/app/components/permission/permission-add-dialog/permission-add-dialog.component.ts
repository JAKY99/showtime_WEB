import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PermissionFormComponent} from "../permission-form/permission-form.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-permission-add-dialog',
  templateUrl: './permission-add-dialog.component.html',
  styleUrls: ['./permission-add-dialog.component.scss']
})
export class PermissionAddDialogComponent implements OnInit {

  // @ts-ignore
  @ViewChild('newPermissionFormRef') newPermissionFormChild: PermissionFormComponent;

  @Output() permissionSaved = new EventEmitter();

  constructor(private messageService: MessageService) {
  }

  display: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
  }

  showDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
    this.newPermissionFormChild.resetForm();
  }

  async submitPermission() {
    this.loading = true;
    await this.newPermissionFormChild?.submitPermission();
    this.loading = false;
  }

  onPermissionSaved($event: { id: number | null }) {
    if ($event.id != null) {
      this.closeDialog();
      this.showBottomCenterToast(
        "success",
        "Permission saved",
        "Permission added successfully.",
      );
      this.permissionSaved.emit();
    } else {
      this.showBottomCenterToast(
        "error",
        "Unable to save",
        "Permission was not added. please try again later or contact an administrator.",
        true
      );
    }
  }

  showBottomCenterToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}
