import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegexFieldValidator} from "../../common/validators/RegexFieldValidator";
import {GlobalRegex} from "../../common/constants/global-regex";
import {TokenStorageService} from "../../services/token-storage.service";
import {HttpHeaders} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ClientErrorsEnum} from "../../common/enums/http-status-codes/client-errors-enum";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private header: HttpHeaders | undefined;
  public loginForm: FormGroup;
  public isLoading: boolean = false;
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private messageService: MessageService,
              private router: Router) {
    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']).then(r => r);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        RegexFieldValidator(GlobalRegex.emailRegex)
      ]),
      password: new FormControl('', Validators.required)
    });

  }

  get email() {
    return this.loginForm.get('email')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  submitLogin(): void {
    this.isLoading = true;
    this.authService.login(this.email, this.password).toPromise()
      .then(response => {
        this.header = response.headers;
        // @ts-ignore
        let isUserAdmin = this.tokenStorage.saveToken(this.header.get('Authorization'));
        // @ts-ignore
        this.tokenStorage.saveRefreshToken(this.header.get('Refresh'));
        if (!isUserAdmin) {
          this.addSingleToast(
            'error',
            'Unauthorized !',
            'This account is not authorized to access this platform.',
          )
        } else {
          this.router.navigate(['/home']).then();
        }
        this.isLoading = false;
      })
      .catch(err => {
        if (err.status === ClientErrorsEnum.ClientErrorForbidden) {
          this.addSingleToast(
            'error',
            'Authentication error',
            'The email or password you entered is incorrect',
            true
          )
        }
        this.isLoading = false;
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity: severity, summary: title, detail: details, sticky: sticky});
  }
}
