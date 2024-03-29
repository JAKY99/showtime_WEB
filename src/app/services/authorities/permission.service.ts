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

  getPermission(id: number): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/permission/" + id;
    return this.http.get<any>(url);
  }

  addPermission(permission: PermissionNoIdModel): Observable<any> {
    console.log(permission);
    let url = GlobalConstants.API_URL + "/api/v1/permission/add";
    return this.http.post<any>(url, permission);
  }

  editPermission(permission: PermissionModel): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/permission";
    return this.http.put<any>(url, permission);
  }

  deletePermission(permissionId: number): Observable<any> {
    console.log("dzqkhdzqfdhgq")
    let url = GlobalConstants.API_URL + "/api/v1/permission/" + permissionId;
    return this.http.delete<any>(url);
  }
}
