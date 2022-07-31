import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {UserAvatarModel} from "../../models/user/user-avatar-model";
import {ClientSuccessEnum} from "../../common/enums/http-status-codes/client-success-enum";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

// @ts-ignore
@Component({
  selector: 'app-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss']
})
export class AvatarMenuComponent implements OnInit {

  // @ts-ignore
  @Output() onLogOutEmit = new EventEmitter<any>();
  @Input() loggedInUser: UserAvatarModel = {
    firstName: "",
    lastName: "",
    fullName: "",
    country: "",
    profilePicture: ""
  };

  items: MenuItem[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private location: Location) { }

  ngOnInit(): void {
    if (window.location.pathname !== '/login') this.getLoggedInUser();

    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      },
      {
        separator:true
      },
      {
        label:'Log Out',
        icon:'pi pi-fw pi-power-off',
        command: () => this.logOutEmit()
      }
    ];
  }

  logOutEmit(){
    this.onLogOutEmit.emit();
  }

  getLoggedInUser(){
    this.userService.getLoggedInUser().toPromise()
      .then((response) => {
        if (response.status === ClientSuccessEnum.SuccessOK){
          this.loggedInUser = response.body;
        }
      })
      .catch((error) => {
        this.addSingleToast(
          "error",
          "An error occurred!",
          "Please try to refresh the page. If the error persist, contact an administrator."
        )
      })
  }

  getLoggedInUserProfilePicture(){
    return this.loggedInUser.profilePicture;
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }
}
