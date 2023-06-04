import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/constants/global-constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response'
};
@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  pushNotification(topicName: string,message : string,Severity : string) {
    console.log(topicName,message)
    let url = GlobalConstants.API_URL + "/api/v1/kafka/send";
    // @ts-ignore
    return this.http.post<string>(
      url,
      {topicName : topicName , message : message,severity : Severity},
      this.tokenStorage.getClientUsername(),
      // @ts-ignore
      httpOptions);
  }
}
