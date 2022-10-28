import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MenubarComponent} from './components/menubar/menubar.component';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {CardModule} from "primeng/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AuthGuard} from "./auth.guard";
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {BlockUIModule} from "primeng/blockui";
import {AvatarMenuComponent} from './components/avatar-menu/avatar-menu.component';
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {SlideMenuModule} from "primeng/slidemenu";
import {RippleModule} from "primeng/ripple";
import {UsersListComponent} from './pages/users-pages/users-list/users-list.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {PermissionListComponent} from './pages/security-pages/permission-list/permission-list.component';
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {
  PermissionDialogComponent
} from './components/permission/permission-dialog/permission-dialog.component';
import {PermissionFormComponent} from './components/permission/permission-form/permission-form.component';
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    LoginFormComponent,
    LoginPageComponent,
    HomePageComponent,
    AvatarMenuComponent,
    UsersListComponent,
    BreadcrumbComponent,
    PermissionListComponent,
    PermissionDialogComponent,
    PermissionFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    FormsModule,
    PasswordModule,
    DividerModule,
    ReactiveFormsModule,
    ToastModule,
    BlockUIModule,
    AvatarModule,
    BadgeModule,
    SlideMenuModule,
    RippleModule,
    BreadcrumbModule,
    TableModule,
    MultiSelectModule,
    DialogModule,
    InputTextareaModule,
    InputMaskModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
      multi: true
    },
    HttpClientModule,
    MessageService,
    AuthGuard,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
