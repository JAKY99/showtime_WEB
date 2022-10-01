import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./auth.guard";
import {UsersListComponent} from "./pages/users-pages/users-list/users-list.component";
import {PermissionListComponent} from "./pages/security-pages/permission-list/permission-list.component";

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
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
