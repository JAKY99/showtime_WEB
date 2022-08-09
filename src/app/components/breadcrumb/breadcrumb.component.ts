import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreadcrumbService} from "../../services/breadcrumb/breadcrumb.service";
import {BreadcrumbModel} from "../../models/breadcrumb/breadcrumb-model";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<BreadcrumbModel[]> | undefined;
  // @ts-ignore
  public items: MenuItem[];

  constructor( private readonly breacrumbService: BreadcrumbService, private router: Router) {
    this.breadcrumbs$ = this.breacrumbService.breadcrumbs$;
    this.breadcrumbs$.subscribe(values => this.items = values);
  }

  ngOnInit(): void {
  }

}
