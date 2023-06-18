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
    public router: Router) {
  }

  items: MenuItem[] = [];
  ngOnInit(): void {
    // @ts-ignore
    this.clientAuthorities = this.tokenStorage.getClientAuthorities();
    this.items = [
    ];

    // @ts-ignore
    if (this.clientAuthorities?.permissions.includes(UserManageAuthorities.USER_MANAGE_USERS)) {
      this.items.push({
        label: 'Notifications',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            icon: '',
            label: 'Send Notifications',
            command: () => this.gotToLink('home/notifications/send')
          },
          {
            icon: '',
            label: 'Search Notifications',
            command: () => this.gotToLink('home/notifications/list')
          },
        ]
      });
      this.items.push({
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
                command: () => this.gotToLink('home/users/list')
              }
            ]
          }
        ]
      });
      this.items.push({
        label: 'Comments',
        icon: 'pi pi-fw pi-comments',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-comments',
            items: [
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
                command: () => this.gotToLink('home/comment/validation')
              }
            ]
          }
        ]
      });
    }

    // @ts-ignore
    if (this.clientAuthorities?.permissions.includes(UserManageAuthorities.USER_MANAGE_PERMISSION)) {
      this.items.push({
        label: 'Security',
        icon: 'pi pi-fw pi-shield',
        items: [
          {
            label: 'Search',
            icon: 'pi pi-fw pi-shield',
            items: [
              {
                label: 'Permissions List',
                icon: 'pi pi-fw pi-list',
                command: () => this.gotToLink('home/security/permission')
              },
              {
                label: 'Roles List',
                icon: 'pi pi-fw pi-list',
                command: () => this.gotToLink('home/security/role')
              }
            ]
          }
        ]
      })
    }
  }

  logOut() {
    this.tokenStorage.logOut();
    this.router.navigate(['/login']).then();
  }

  showConfirmLogout() {
    this.messageService.add({
      key: 'showConfirmLogout',
      sticky: true,
      severity: 'custom',
      summary: 'Log Out',
      detail: 'Are you sure?'
    });
  }

  onLogoutConfirm() {
    this.messageService.clear('showConfirmLogout');
    this.logOut();
  }

  onLogoutReject() {
    this.messageService.clear('showConfirmLogout');
  }

  gotToLink(link: string) {
    this.router.navigate([link]).then();
  }


}
