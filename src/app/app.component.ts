import {Component, Input, ViewEncapsulation} from '@angular/core';
import {PrimeNGConfig, ConfirmationService, Confirmation} from 'primeng/api';
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  blockedDocument: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, public router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.confirmationService.requireConfirmation$.subscribe((confirmation: Confirmation) => {
      this.customHeader = confirmation.message;
    });
  }

  title = 'Showtime';
  customHeader: any;

  toggleBlockDocument() {
    this.blockedDocument = !this.blockedDocument;
  }

  isRouteLogin() {
    return this.router.url == '/login';
  }
}
