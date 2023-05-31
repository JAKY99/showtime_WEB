import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./auth.guard";
import {UsersListComponent} from "./pages/users-pages/users-list/users-list.component";
import {PermissionListComponent} from "./pages/security-pages/permission-list/permission-list.component";
import {NotificationsFormComponent} from "./components/notifications-form/notifications-form.component";
import {CommentComponent} from "./pages/comment-page/comment.component";
import {RoleListComponent} from "./pages/security-pages/role-list/role-list.component";
import {Page404Component} from "./pages/page404/page404.component";
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {
    path: 'home',
    children:[
      {
        path: '',
        component: HomePageComponent,
        canActivate: [AuthGuard],
        data: {breadcrumb : 'Home'},
      },
      {
        path: 'users',
        children: [
          {
            path: 'list',
            pathMatch: 'full',
            component: UsersListComponent,
            canActivate: [AuthGuard],
            data: {breadcrumb: 'Users list'}
          }
        ]
      },
      {
        path: 'security',
        children: [
          {
            path: 'permission',
            component: PermissionListComponent,
            canActivate: [AuthGuard],
            data: {breadcrumb: 'Permissions list'}
          },
          {
            path: 'role',
            component: RoleListComponent,
            canActivate: [AuthGuard],
            data: {breadcrumb: 'Roles list'}
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: 'send',
            component: NotificationsFormComponent,
            canActivate: [AuthGuard],
            data: {breadcrumb: 'Notifications service'}
          }
        ]
      },
      {
        path: 'comment',
        children: [
          {
            path: 'validation',
            component: CommentComponent,
            canActivate: [AuthGuard],
            data: {breadcrumb: 'Comments service'}
          }
        ]
      },
      { path: '**', component: Page404Component },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
