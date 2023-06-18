import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PermissionFormComponent} from "../../permission/permission-form/permission-form.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-permission-edit-dialog',
  templateUrl: './permission-edit-dialog.component.html',
  styleUrls: ['./permission-edit-dialog.component.scss']
})
export class PermissionEditDialogComponent implements OnInit {

  // @ts-ignore
  @ViewChild('editPermissionFormRef') editPermissionFormChild: PermissionFormComponent;

  @Output() permissionSaved = new EventEmitter();


  display: boolean = false;
  loading: boolean = false;
  permissionId: number = 0;

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  showDialog(permissionId: number) {
    this.permissionId = permissionId;
    setTimeout(() => {
      if (permissionId !== 0) {
        this.editPermissionFormChild.getPermission();
      }
      this.display = true;
    }, 0)
  }

  closeDialog() {
    this.display = false;
    this.editPermissionFormChild.resetForm();
  }

  async submitPermission() {
    this.loading = true;
    await this.editPermissionFormChild?.submitEditPermission();
    this.loading = false;
  }

  onPermissionSaved($event: { id: number | null }) {
    if ($event.id != null) {
      this.closeDialog();
      this.showBottomCenterToast(
        "success",
        "Permission saved",
        "Permission edited successfully.",
      );
      this.permissionSaved.emit();
    } else {
      this.showBottomCenterToast(
        "error",
        "Unable to edit",
        "Permission was not added. please try again later or contact an administrator.",
        true
      );
    }
  }

  showBottomCenterToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}
