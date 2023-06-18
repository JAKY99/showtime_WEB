import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";
import {ChartModule} from 'primeng/chart';
import {HomeService} from "../../services/home/home.service";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: any;
  options: any;
  totalUsers: number = 0;
  totalConnectedUsers: number = 0;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private homePageService: HomeService
  ) {

  }

  ngOnInit(): void {
    window.addEventListener('metrics-updated', (event) => {
      this.getMetrics();
    });
    this.getMetrics();
  }

async getMetrics() {
  await this.homePageService.getMetrics().subscribe(res=>{
    this.totalUsers = res[res.length-1].totalUsers;
    this.totalConnectedUsers = res[res.length-1].totalConnectedUsers;
    this.data = {
      labels: ['', ''],
      datasets: [
        {
          label: 'Users connected',
          data: [this.totalConnectedUsers,this.totalConnectedUsers]
        },
        {
          label: 'Total users',
          data: [this.totalUsers,this.totalUsers]
        }
      ]
    }
  })
}
  addSingleToast(severity: string, title: string, details: string, sticky?: boolean) {
    this.messageService.add({severity:severity, summary:title, detail:details, sticky: sticky});
  }

  updateMetric() {
    this.homePageService.updateMetrics().subscribe(res=>{
      this.addSingleToast('success','Success','Metrics updated successfully')
    },error => {
      this.addSingleToast('error','Error',error.error.message)
    })
  }
}
