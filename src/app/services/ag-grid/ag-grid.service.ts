import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../common/constants/global-constants";
import {TokenStorageService} from "../token-storage.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})
export class AgGridService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

  }
  getRowsData(path: string | undefined): Observable<any>{
    let url = GlobalConstants.API_URL + path;
    // @ts-ignore
    return this.http.post<string>(
      url,
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions
    );
  }

  addRow(path: string, formData: any) {

    let url = GlobalConstants.API_URL + path;
    // @ts-ignore
    return this.http.post<string>(
      url,
      formData,
      // @ts-ignore
      httpOptions
    );
  }

  editRow(path: string, dataToEdit: any) {
    let url = GlobalConstants.API_URL + path;
    // @ts-ignore
    return this.http.post<string>(
      url,
      dataToEdit,
      // @ts-ignore
      httpOptions
    );
  }
  getOptionsList(path: string): Observable<any> {
    let url = GlobalConstants.API_URL + path;
    // @ts-ignore
    return this.http.get<string>(
      url,
      // @ts-ignore
      httpOptions
    );
  }
}
