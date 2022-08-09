import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ActivatedRouteSnapshot, Data, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {BreadcrumbModel} from "../../models/breadcrumb/breadcrumb-model";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly _breadcrumbs$ = new BehaviorSubject<BreadcrumbModel[]>([]);
  private readonly homeBreadcrumb = {label: '', routerLink: '/home', icon: 'pi pi-home'};

  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(event => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: BreadcrumbModel[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      if (!(breadcrumbs.find(x => x.routerLink === '/home'))){
        breadcrumbs.unshift(this.homeBreadcrumb);
      }

      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[], breadcrumbs: BreadcrumbModel[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      let breadcrumb;
      if (route.data.breadcrumb) {
        if (route.data.breadcrumb === 'Home'){
          breadcrumb = {
            label: '',
            // @ts-ignore
            icon: 'pi pi-home',
            routerLink: '/' + routeUrl.join('/')
          };
        }else{
          breadcrumb = {
            label: BreadcrumbService.getLabel(route.data),
            routerLink: '/' + routeUrl.join('/')
          };
        }
        breadcrumbs.push(breadcrumb);
      }

      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private static getLabel(data: Data) {
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
  }
}
