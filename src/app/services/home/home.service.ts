import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token-storage.service";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }

  getMetrics(): Observable<any> {
    let url = GlobalConstants.API_URL + "/api/v1/metrics/all";
    // @ts-ignore
    return this.http.post<string>(
      url,
      // @ts-ignore
      httpOptions);
  }

  updateMetrics() {
    let url = GlobalConstants.API_URL + "/api/v1/metrics/update";
    // @ts-ignore
    return this.http.post<string>(
      url,
      // @ts-ignore
      httpOptions);
  }
}
