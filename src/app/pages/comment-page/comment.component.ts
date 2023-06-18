import {Component, OnInit, ViewChild} from '@angular/core';
import {CommentModel} from "../../models/comment/comment-model";
import {SearchParamsModel} from "../../models/search/searchParams";
import {CommentService} from "../../services/comment/comment.service";
import {LazyLoadEvent} from "primeng/api";
import {SearchService} from "../../services/search/search.service";
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CommentComponent implements OnInit {

  comment: CommentModel[] = []
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  // @ts-ignore
  loading: boolean = true;

  visible: boolean = false;

  searchParams: SearchParamsModel = {
    pageNumber: this.first,
    limitRow: this.rows,
    sort: {
      sortField: null,
      sortOrder: null
    },
    filters: null
  }
  constructor(private commentService: CommentService,  private searchService: SearchService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.search(this.searchParams).then();
  }

  async loadComment($event: LazyLoadEvent) {
    await this.search(this.searchService.getSearchParams($event));
  }

  async search(searchParams: SearchParamsModel) {
    this.loading = true;
     await this.commentService.getComment(searchParams).toPromise()
      .then(res => {
        this.comment = res;
        this.totalRecords = res.length;
      })
      .catch(err => {
        console.log(err)
      })
    this.loading = false;
  }

  next() {
    this.first = this.first + this.rows;
  }

  confirm(commentId: number, commentContent: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to validate comment with content : \''+commentContent+'\'?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.validateComment(commentId).toPromise().then(res => {
          if (res == true) {
            this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'You have accepted'});
            this.search(this.searchParams).then();
          }
        }).catch(err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have rejected' });
        });
        this.confirmationService.close();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        this.confirmationService.close();
      }
    });
  }


  spoiler(commentId: any, content: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to validate comment with content : \''+content+'\'?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.spoilComment(commentId).toPromise().then(res => {
          if (res == true) {
            this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'You have rejected'});
            this.search(this.searchParams).then();
          }
        }).catch(err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have rejected' });
        });
        this.confirmationService.close();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        this.confirmationService.close();
      }
    });
  }

  reject(commentId: number, commentContent: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to validate comment with content : \''+commentContent+'\'?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.rejectComment(commentId).toPromise().then(res => {
          if (res == true) {
            this.messageService.add({severity: 'success', summary: 'Confirmed', detail: 'You have rejected'});
            this.search(this.searchParams).then();
          }
        }).catch(err => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have rejected' });
        });
        this.confirmationService.close();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        this.confirmationService.close();
      }
    });
  }
}
