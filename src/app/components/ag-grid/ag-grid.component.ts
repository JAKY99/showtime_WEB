import {Component, Input, OnInit} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import {AgGridService} from "../../services/ag-grid/ag-grid.service";
import {DialogModule} from 'primeng/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {
  @Input() url : string ="" ;
  @Input() pathAdd : string ="" ;
  @Input() pathEdit : string ="" ;
  @Input() pathDelete : string ="" ;
  @Input() columnDefs: any[] = [];
  @Input() titleTable: string = "";
  @Input() addDialogTitle = "Add new element";
  @Input() editDialogTitle = "edit element";
  @Input() deleteDialogTitle = "delete element";
  public rowSelection: 'single' | 'multiple' = 'multiple';
  agGridService: AgGridService;
  public  rowData: any[] = [];
  displayAdd = false;
  formAdd = new FormGroup({});
  formEdit = new FormGroup({});
  @Input() addEnabled : boolean = true ;
  @Input() editEnabled : boolean = true ;
  @Input() deleteEnabled : boolean = true ;
  displayEdit = false;
   // @ts-ignore
   gridOptions = {
    // Add event handlers
    onCellClicked: (event: CellClickedEvent) => event,
  }
  @Input() gridApi: any;
  public currentRow: [] = [];
  submitEditDisable: boolean=false;
  cancelEditDisable : boolean=false;
  isEditLoading: boolean=false;
  formListsOptions : any[]  = [];
  submitAddDisable: boolean=false;
  cancelAddDisable : boolean=false;
  isAddLoading: boolean=false;



  constructor(agGridService: AgGridService,private messageService: MessageService) {
    this.agGridService = agGridService;
  }



  ngOnInit(): void {
    this.loadGridData();
    // @ts-ignore
    this.columnDefs.filter((column: ColDef) => {return column.optionsListUrl!==undefined}).forEach((column: ColDef) => {
      // @ts-ignore
      return this.getOptionsList(column.optionsListUrl, column.field);
    });

    let formGroupConfigAdd = {};
    // @ts-ignore
    this.columnDefs.filter(column=>column.formAdd===true).forEach((column) => {
      // @ts-ignore
      formGroupConfigAdd = {...formGroupConfigAdd, [column.field]: new FormControl('', column.requiredAdd?Validators.required:"")}
    })

    let formGroupConfigEdit = {}
    // @ts-ignore
    this.columnDefs.filter(column=>column.formEdit===true).forEach((column) => {
      // @ts-ignore
      formGroupConfigEdit = {...formGroupConfigEdit, [column.field]: new FormControl('', column.requiredEdit?Validators.required:"")}
    })
    this.formEdit = new FormGroup(formGroupConfigEdit);
    this.formAdd = new FormGroup(formGroupConfigAdd);

  }

  displayAddDialog() {
    this.formAdd.reset();
    this.displayAdd = true;
    for (let key in this.formAdd.controls) {
      // @ts-ignore
      setTimeout(() => {
          document.getElementById(key)?.dispatchEvent(new Event('input'));
        document.getElementById(key)?.dispatchEvent(new Event('change'));

      }, 100);

    }

  }


  displayEditDialog() {
    this.formEdit.reset();
    this.currentRow = this.gridApi.getSelectedRows();
    this.gridApi.getSelectedRows().length === 1 ? this.displayEdit = true :  this.addSingleToast(
      'error',
      'Warning',
      'Please select one row to edit',
      false
    );
    console.log(this.currentRow)
    for (let key in this.formEdit.controls) {
        // @ts-ignore
        this.formEdit.controls[key].setValue(this.currentRow[0][key]);
      // @ts-ignore
      setTimeout(() => {
        document.getElementById(key)?.dispatchEvent(new Event('input'));
        document.getElementById(key)?.dispatchEvent(new Event('change'));

      }, 100);
    }
  }


  onGridReady(event : GridReadyEvent) {
    this.gridApi = event.api
    setTimeout(() => {
      this.gridApi.sizeColumnsToFit()
    }, 100);


  }


  loadGridData() {
    this.agGridService.getRowsData(this.url).toPromise().then(response => {
      this.rowData = response.body;
      // console.log(response)
    } ).catch((error) => {
      console.log(error);
    });
  }
  async getOptionsList(url: string, field: string) {
    // @ts-ignore
    this.formListsOptions[field]= await this.agGridService.getOptionsList(url).toPromise().then(data => {
      return [...data.body]
    } ).catch((error) => {
      console.log(error);
    });
  }
  submitAdd() {
    this.submitAddDisable=true;
    this.cancelAddDisable=true;
    this.isAddLoading=true;

    Object.keys(this.formAdd.value).map((key) => {
      // @ts-ignore
      if(this.formListsOptions[key]!==undefined){
        // @ts-ignore
        let optionNameToDisplay = this.columnDefs.find((column: ColDef) => {return column.field===key})["optionNameToDisplay"]
        // @ts-ignore
        this.formListsOptions[key].filter((option)=> {
          if(option[optionNameToDisplay] === this.formAdd.value[key]){
            // @ts-ignore
            this.formAdd.value[key] = option;
          }
        });
      }
    });
    this.agGridService.addRow(this.pathAdd, this.formAdd.value).toPromise().then(data => {

      this.loadGridData();
      // @ts-ignore
      switch (data.body.severity) {
        case "error":
          this.addSingleToast(
            // @ts-ignore
            data.body.severity,
            // @ts-ignore
            data.body.title,
            // @ts-ignore
            data.body.details,
            // @ts-ignore
            data.body.sticky,
          );
          this.submitAddDisable=false;
          this.cancelAddDisable=false;
          this.isAddLoading=false;
          break;
        case "success":
          this.addSingleToast(
            // @ts-ignore
            data.body.severity,
            // @ts-ignore
            data.body.title,
            // @ts-ignore
            data.body.details,
            // @ts-ignore
            data.body.sticky,
          );
          this.displayAdd=false;
          this.submitAddDisable=false;
          this.cancelAddDisable=false;
          this.isAddLoading=false;
          this.formAdd.reset();
          break;
      }


    } ).catch((error) => {
      console.log(error);
      this.addSingleToast(
        'error',
        'Adding failed',
        'An error occurred',
        false
      );
    });
  }
  submitEdit() {
    this.submitEditDisable=true;
    this.cancelEditDisable=true;
    this.isEditLoading=true;
    // @ts-ignore
    this.formEdit.value.id = this.currentRow[0].id;
    Object.keys(this.formEdit.value).map((key) => {
      // @ts-ignore
      if(this.formListsOptions[key]!==undefined){
        // @ts-ignore
        let optionNameToDisplay = this.columnDefs.find((column: ColDef) => {return column.field===key})["optionNameToDisplay"]
        // @ts-ignore
          this.formListsOptions[key].filter((option)=> {
          if(option[optionNameToDisplay] === this.formEdit.value[key]){
            // @ts-ignore
            this.formEdit.value[key] = option;
          }
        });
      }
    });
    this.agGridService.editRow(this.pathEdit, this.formEdit.value).toPromise().then(data => {

      // @ts-ignore
      switch (data.body.severity) {
        case "error":
          this.addSingleToast(
            // @ts-ignore
            data.body.severity,
            // @ts-ignore
            data.body.title,
            // @ts-ignore
            data.body.details,
            // @ts-ignore
            data.body.sticky,
          );
          this.submitEditDisable=false;
          this.cancelEditDisable=false;
          this.isEditLoading=false;
          break;
        case "success":
          this.addSingleToast(
            // @ts-ignore
            data.body.severity,
            // @ts-ignore
            data.body.title,
            // @ts-ignore
            data.body.details,
            // @ts-ignore
            data.body.sticky,
          );
          this.displayEdit=false;
          this.submitEditDisable=false;
          this.cancelEditDisable=false;
          this.isEditLoading=false;
          this.formEdit.reset();
          this.loadGridData();
          break;
      }

    } ).catch((error) => {
      console.log(error);
    });
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}

