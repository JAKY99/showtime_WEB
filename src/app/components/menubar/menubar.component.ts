import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {TokenStorageService} from "../../services/token-storage.service";
import {Router} from "@angular/router";
import {UserManageAuthorities} from "../../common/enums/authorities/permissions-enum";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  private clientAuthorities: object = {
    role: null,
    permissions: []
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private router: Router) {
  }

  items: MenuItem[] = [];

  ngOnInit(): void {
    // @ts-ignore
    this.clientAuthorities = this.tokenStorage.getClientAuthorities();

    this.items = [
      {
        label:'File',
        icon:'pi pi-fw pi-file',
        items:[
          {
            label:'New',
            icon:'pi pi-fw pi-plus',
            items:[
              {
                label:'Bookmark',
                icon:'pi pi-fw pi-bookmark'
              },
              {
                label:'Video',
                icon:'pi pi-fw pi-video'
              },
            ]
          },
          {
            label:'Delete',
            icon:'pi pi-fw pi-trash'
          },
          {
            separator:true
          },
          {
            label:'Export',
            icon:'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label:'Edit',
        icon:'pi pi-fw pi-pencil',
        items:[
          {
            label:'Left',
            icon:'pi pi-fw pi-align-left'
          },
          {
            label:'Right',
            icon:'pi pi-fw pi-align-right'
          },
          {
            label:'Center',
            icon:'pi pi-fw pi-align-center'
          },
          {
            label:'Justify',
            icon:'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label:'Events',
        icon:'pi pi-fw pi-calendar',
        items:[
          {
            label:'Edit',
            icon:'pi pi-fw pi-pencil',
            items:[
              {
                label:'Save',
                icon:'pi pi-fw pi-calendar-plus'
              },
              {
                label:'Delete',
                icon:'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label:'Archieve',
            icon:'pi pi-fw pi-calendar-times',
            items:[
              {
                label:'Remove',
                icon:'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];

    // @ts-ignore
    if (this.clientAuthorities?.permissions.includes(UserManageAuthorities.USER_MANAGE_USERS)){
      this.items.push({
        label:'Users',
        icon:'pi pi-fw pi-user',
        items:[
          {
            label:'New',
            icon:'pi pi-fw pi-user-plus',

          },
          {
            label:'Delete',
            icon:'pi pi-fw pi-user-minus',

          },
          {
            label:'Search',
            icon:'pi pi-fw pi-users',
            items:[
              {
                label:'Search by email',
                icon:'pi pi-fw pi-search',
              },
              {
                icon:'pi pi-fw pi-bars',
                label:'List',
                command: () => this.gotToLink('home/users/list')
              }
            ]
          }
        ]
      });
    }
  }

  logOut() {
    this.tokenStorage.logOut();
    this.router.navigate(['/login']).then();
  }

  showConfirmLogout() {
    this.messageService.add({key: 'showConfirmLogout', sticky: true, severity:'custom', summary:'Log Out', detail:'Are you sure?'});
  }

  onLogoutConfirm() {
    this.messageService.clear('showConfirmLogout');
    this.logOut();
  }

  onLogoutReject() {
    this.messageService.clear('showConfirmLogout');
  }

  gotToLink(link: string){
    this.router.navigate([link]).then();
  }
}
