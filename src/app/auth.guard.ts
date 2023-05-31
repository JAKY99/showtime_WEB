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
    if (!this.clientAuthorities?.role === RolesEnum.ADMIN) {
      this.router.navigate(['/login']).then(() => {
        this.tokenStorage.logOut()
        return false;
      });
    }
    if (!this.tokenStorage.isTokenExpired()) {
      return true
    }
    this.router.navigate(['/login']).then(() => {
      return false
    });
  }

}
