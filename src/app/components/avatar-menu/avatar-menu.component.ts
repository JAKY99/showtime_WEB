import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {UserAvatarModel} from "../../models/user/user-avatar-model";
import {ClientSuccessEnum} from "../../common/enums/http-status-codes/client-success-enum";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

// @ts-ignore
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as moment from "moment/moment";
import {TokenStorageService} from "../../services/token-storage.service";
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
  notification : any[] = [];
  unread_notification : any[] = [];
  url = 'http://localhost:8082/websocket'
  client: any;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private location: Location,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (window.location.pathname !== '/login') this.getLoggedInUser();

    this.items = [
      {
        separator:true
      },
      {
        label:'Log Out',
        icon:'pi pi-fw pi-power-off',
        command: () => this.logOutEmit()
      }
    ];
    this.getNotification();
    this.connection();
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
  connection(){
    let ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    let that = this;

    // @ts-ignore
    this.client.connect({}, ()=>{
      // @ts-ignore
      that.client.subscribe("/topic/admin", (message) => {
        if(message.body) {
          this.getNotification();
        }
      });
    },this.onSocketfailure);
  }
  onSocketfailure=()=>{
    setTimeout(()=>{
      this.connection();
    } , 5000);
  }
  alertDialogTitle: string="Notification's list";
  displayAlert: boolean = false;
  columnDefs = [
    {headerName: 'Message', field: 'message', checkboxSelection: true, sortable: true, filter: true, width: 200,formAdd:false,formEdit:false, floatingFilter: true},
    {headerName: 'Severity', field: 'severity', sortable: true, filter: true, width: 200,formAdd:false,formEdit:false, floatingFilter: true},
    {headerName: 'Created at', field: 'dateCreated', sortable: true, filter: true, width: 200,formAdd:false,formEdit:false, floatingFilter: true,cellRenderer: (data: { value: any; }) => {
        return moment(data.value).format("MMM Do YY"); }
    },
  ];
  path: string="/management/api/v1/user/notification";
  pathAdd: string="";
  pathEdit: string="";
  pathDelete: string="";
  addDialogTitle: string="Notifications list";
  editDialogTitle: string="";
  deleteDialogTitle: string="";
  addEnabled: boolean = false;
  editEnabled: boolean = false;
  deleteEnabled: boolean = true;


  showModalNotificationAlert() {
    this.updateNotification();
    this.notification = [];
    this.unread_notification = [];
    this.displayAlert = true;
    this.getNotification();
  }
  getNotification(){
    this.userService.getNotification().subscribe((response) => {
      //@ts-ignore
      if (response.status === ClientSuccessEnum.SuccessOK) {
        //@ts-ignore
        this.notification = response.body;
        this.unread_notification = this.notification.filter((item) => {
          return item.status === "unread";
        });
        console.log(this.unread_notification);
      }
    });
  }
  updateNotification(){
    this.userService.updateNotification().subscribe((response) => {
      this.getNotification();
    });
  }
}
