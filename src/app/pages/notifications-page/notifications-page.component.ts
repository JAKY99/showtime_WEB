import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegexFieldValidator} from "../../common/validators/RegexFieldValidator";
import {GlobalRegex} from "../../common/constants/global-regex";

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.scss']
})
export class NotificationsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
