import {
  Component, Input, OnInit, ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { Restaurant } from '../restaurant/entities/restaurant';
import { RestaurantStoreService } from '../services/restaurant-store.service';

@Component({ selector: 'app-alert-timer', templateUrl: './alert-timer.component.html' })
export class AlertTimerComponent implements OnInit {
  @Input()
  maliciousRequest: boolean = false;

  alertMessage = 'only admins can edit menus';

  constructor(
    private restaurantStoreService: RestaurantStoreService
  ) {
    this.registerAlert();

  }

  private _success = new Subject<string>();

  staticAlertClosed = false;

  successMessage = '';

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

   registerAlert() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(debounceTime(2500)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  async activateAlertHandler(): Promise<void> {
    this.restaurantStoreService.maliciousRequest$
    .subscribe((status) => {
      this.maliciousRequest = status;
      if (this.maliciousRequest) {
        this._success.next(this.alertMessage);
      }
    })
  }


  async ngOnInit(): Promise<void> {
    await this.restaurantStoreService.getMaliciousRequestStatus();
    await this.activateAlertHandler();
  }
}
