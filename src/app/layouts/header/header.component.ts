import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  infoCart: any = {
    quantityItem: 0,
    amountTotal: 0,
  };

  clickEventSubscription!: Subscription;

  constructor(private sharedService: SharedService, private route: Router) {
    this.clickEventSubscription = this.sharedService
      .getClickEvent()
      .subscribe((res) => {
        this.incrementCount(res);
      });
  }

  ngOnInit(): void {}

  incrementCount(info: any) {
    this.infoCart = info;
  }

  viewDtailsCart() {
    this.route.navigate(['/cart-detail']);
  }
}
