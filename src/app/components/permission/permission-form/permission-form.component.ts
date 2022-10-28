import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalRegex} from "../../../common/constants/global-regex";
import {RegexFieldValidator} from "../../../common/validators/RegexFieldValidator";
import {PermissionService} from "../../../services/authorities/permission.service";
import {PermissionModel, PermissionNoIdModel} from "../../../models/Authorities/permission-model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PermissionFormComponent implements OnInit {

  public form: FormGroup;

  @Output() permissionSaved = new EventEmitter<{ id: number | null }>();

  public isDisplayNameFieldError: boolean = false;
  public permissionFieldError: string = "";
  public permissionFieldErrors: {
    required: {
      key: number,
      error: string
    },
    format: {
      key: number,
      error: string
    };
  } = {
    "required": {
      key: 1,
      error: "This field is required"
    },
    "format": {
      key: 2,
      error: "The format is incorrect"
    }
  };

  constructor(private permissionService: PermissionService) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl('', Validators.required),
      permission: new FormControl('', [
        RegexFieldValidator(GlobalRegex.permissionTypeRegex),
        Validators.required
      ]),
      description: new FormControl()
    })
  }

  get displayNameControl() {
    return this.form.controls['displayName'];
  }

  get permissionControl() {
    return this.form.controls['permission'];
  }

  setDisplayNameErrors() {
    this.isDisplayNameFieldError = !!(this.displayNameControl.touched && this.displayNameControl.errors?.required);
  }

  setPermissionErrors() {
    if (this.permissionControl.invalid && this.permissionControl.errors?.required) {
      this.permissionFieldError = this.permissionFieldErrors.required.error;
      return;
    }
    if (this.permissionControl.invalid && this.permissionControl.errors?.forbiddenName?.value != null) {
      this.permissionFieldError = this.permissionFieldErrors.format.error;
      return;
    }

    this.permissionFieldError = "";
  }

  async submitPermission() {
    const newPermission: PermissionNoIdModel = {
      permission: this.form.value.permission,
      description: this.form.value.description,
      displayName: this.form.value.displayName
    }
    await this.permissionService.addPermission(newPermission).toPromise()
      .then((resp) => {
        this.permissionSaved.emit({id: resp});
      })
      .catch((err) => {
        this.permissionSaved.emit({id: null});
      });
  }

  resetForm() {
    this.isDisplayNameFieldError = false;
    this.permissionFieldError = "";
    this.form.reset();
  }


}
