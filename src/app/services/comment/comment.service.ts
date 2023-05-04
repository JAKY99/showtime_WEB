import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../../common/constants/global-constants";
import {SearchParamsModel} from "../../models/search/searchParams";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComment(searchParams: SearchParamsModel) {
    let url = GlobalConstants.API_URL + "/api/v1/comment/getAllComments";
    return this.http.get<any>(url);
  }


  validateComment(commentId: number) {
    let url = GlobalConstants.API_URL + "/api/v1/comment/validateComment/";
    return this.http.put<any>(url, commentId);
  }

  rejectComment(commentId: number) {
    let url = GlobalConstants.API_URL + "/api/v1/comment/rejectComment/";
    return this.http.put<any>(url, commentId);
  }

  spoilComment(commentId: any) {
    let url = GlobalConstants.API_URL + "/api/v1/comment/spoilComment/";
    let data = {
      user_id: null,
      comment_id: commentId,
      message: null,
      topicName: GlobalConstants.ENV + "UserComment"
    }
    return this.http.put<any>(url, data);
  }
}
