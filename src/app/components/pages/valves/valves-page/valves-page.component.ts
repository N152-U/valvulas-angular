import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-valves-page',
  templateUrl: './valves-page.component.html',
  styleUrls: ['./valves-page.component.scss']
})
export class ValvesPageComponent implements OnInit {

  items: MenuItem[];

  subscription: Subscription;


  constructor() { }

  ngOnInit() {
    this.items = [{
      label: 'Personal',
      routerLink: 'personal'
    },
    {
      label: 'Seat',
      routerLink: 'seat'
    },
    {
      label: 'Payment',
      routerLink: 'payment'
    },
    {
      label: 'Confirmation',
      routerLink: 'confirmation'
    }
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
