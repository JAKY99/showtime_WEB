import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from "./services/token-storage.service";
import {RolesEnum} from "./common/enums/authorities/roles-enum";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenStorage: TokenStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // @ts-ignore
    this.clientAuthorities = this.tokenStorage.getClientAuthorities();
    // @ts-ignore
    console.log(this.clientAuthorities)
    // @ts-ignore
    console.log(`!this.clientAuthorities.role === RolesEnum.ADMIN:${(!this.clientAuthorities.role === RolesEnum.ADMIN)}`)
    // @ts-ignore
    if (!(this.clientAuthorities.role === RolesEnum.ADMIN)) {

      this.tokenStorage.logOut();
      location.href = '/login';
    }
    if (!this.tokenStorage.isTokenExpired() ) {
      return true
    } else if (this.tokenStorage.isTokenExpired() && !this.tokenStorage.isRefreshTokenExpired()) {
      try {
        this.tokenStorage.refreshToken();
        return true
      } catch (e) {
        this.router.navigate(['/login']).then(() => {
          return false
        });
      }
    }
    this.router.navigate(['/login']).then(() => {
      return false
    });
  }

}
