import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegexFieldValidator} from "../../common/validators/RegexFieldValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {GlobalConstants} from "../../common/constants/global-constants";
import {NotificationService} from "../../services/notification.service";
import {MessageService} from "primeng/api";
@Component({
  selector: 'app-notifications-form',
  templateUrl: './notifications-form.component.html',
  styleUrls: ['./notifications-form.component.scss']
})
export class NotificationsFormComponent implements OnInit {
  public notificationForm: FormGroup;
  public env: string;
  constructor(private NotificationService : NotificationService,private messageService: MessageService) {
    this.env = GlobalConstants.ENV
    this.notificationForm = new FormGroup({
      Destination: new FormControl('User', [
        Validators.required,
      ]),
      Severity: new FormControl('info', [
        Validators.required,
      ]),
      Env: new FormControl('dev', Validators.required),
      Message: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    let topicName = this.env+this.notificationForm.value['Destination']
    this.NotificationService.pushNotification(topicName,this.notificationForm.value['Message'],this.notificationForm.value['Severity']).subscribe();
    this.addSingleToast(
      'success',
      "Message sent",
      'Please check your notification',
      false
    );
  }
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }

}
