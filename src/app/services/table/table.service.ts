import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {TokenStorageService} from "../token-storage.service";
import {SearchParamsModel} from "../../models/search/searchParams";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getLoggedInUser(): Observable<any>{
    let url = GlobalConstants.API_URL + "/api/v1/user/loggedin";
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }

  getList(searchParams: SearchParamsModel, path: string | undefined): Observable<any>{
    console.log(path)
    let url = GlobalConstants.API_URL + path;
    // @ts-ignore
    return this.http.post<string>(
      url,
      searchParams
      // @ts-ignore
      );
  }

  getElement(id : number, path: string | undefined): Observable<any>{
    console.log(path)
    let url = GlobalConstants.API_URL + path + id;
    // @ts-ignore
    return this.http.post<string>(
      url,
      id
      // @ts-ignore
    );
  }
}
