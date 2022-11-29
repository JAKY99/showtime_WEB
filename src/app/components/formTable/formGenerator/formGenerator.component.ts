import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalRegex} from "../../../common/constants/global-regex";
import {RegexFieldValidator} from "../../../common/validators/RegexFieldValidator";
import {PermissionService} from "../../../services/authorities/permission.service";
import {PermissionModel, PermissionNoIdModel} from "../../../models/Authorities/permission-model";
import {TableService} from "../../../services/table/table.service";

@Component({
  selector: 'app-formGenerator',
  templateUrl: './formGenerator.component.html',
  styleUrls: ['./formGenerator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormGeneratorComponent implements OnInit {

  public form: FormGroup;

  @Output() elementCreated = new EventEmitter<{ id: number | null }>();
  @Output() elementSaved = new EventEmitter<{ id: number | null }>();

  @Input() elementId: number = 0;
  @Input() formConfig = []
  @Input() urlGetSingleElement: string="";
  @Input() urlEdit: string="";
  @Input() urlDelete: string="";
  public isDisplayNameFieldError: boolean = false;
  public elementFieldError: string = "";
  public elementFieldErrors: {
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
  fieldError: boolean = false;

  constructor(private tableService: TableService) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    let formGroupConfig = {};
    this.formConfig.forEach((field) => {
      // @ts-ignore
      formGroupConfig={...formGroupConfig, [field.name]: new FormControl('', Validators.required)}
    })
    this.form = new FormGroup(formGroupConfig);
    // this.form = new FormGroup({
    //   // displayName: new FormControl('', Validators.required),
    //   // permission: new FormControl('', [
    //   //   RegexFieldValidator(GlobalRegex.permissionTypeRegex),
    //   //   Validators.required
    //   // ]),
    //   // description: new FormControl()
    //
    // })

  }

  getElement() {
    this.tableService.getElement(this.elementId,this.urlGetSingleElement).toPromise()
      .then((res) => {
        this.form.setValue({
          ...res.formData
        });
      })
  }

  get displayNameControl() {
    return this.form.controls['displayName'];
  }

  get permissionControl() {
    return this.form.controls['permission'];
  }

  setDisplayNameErrors() {

  }

  setPermissionErrors() {

  }

  async submitEditPermission() {

  }

  async submitAddPermission() {

  }

  resetForm() {

  }


  submitEdit() {

  }

  setDisplayErrors() {

  }
}
