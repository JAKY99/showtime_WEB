import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../common/constants/global-constants";
import {Observable} from "rxjs";
import {PermissionModel, PermissionNoIdModel} from "../../models/Authorities/permission-model";
import {LazyLoadEvent} from "primeng/api";
import {SearchParamsModel} from "../../models/search/searchParams";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) {
  }

  getPermissions(searchParams: SearchParamsModel): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/permission";
    return this.http.post<any>(url, searchParams);
  }

  addPermission(permission: PermissionNoIdModel): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/permission/add";
    return this.http.post<any>(url, permission);
  }
}
