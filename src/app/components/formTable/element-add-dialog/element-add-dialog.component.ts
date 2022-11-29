import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormGeneratorComponent } from '../formGenerator/formGenerator.component';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-element-add-dialog',
  templateUrl: './element-add-dialog.component.html',
  styleUrls: ['./element-add-dialog.component.scss']
})
export class ElementAddDialogComponent implements OnInit {

  // @ts-ignore

  @Output() elementSaved = new EventEmitter();

  constructor(private messageService: MessageService) {
  }

  display: boolean = false;
  loading: boolean = false;
  newPermissionFormChild: any;

  ngOnInit(): void {
  }


 showDialog() {
    console.log('showDialog');
    this.display = true;
 }

  showBottomCenterToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

  closeDialog() {
    this.display = false;
  }

  submitAdd() {

  }

  onElementCreated($event: { id: number | null }) {

  }
}
