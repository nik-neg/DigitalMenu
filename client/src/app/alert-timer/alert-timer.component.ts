import {
  Component, Input, OnInit, ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { Restaurant } from '../restaurant/entities/restaurant';

@Component({ selector: 'app-alert-timer', templateUrl: './alert-timer.component.html' })
export class AlertTimerComponent implements OnInit {
  @Input()
  maliciousRequest!: boolean;

  alertMessage = 'only admins can edit menus';

  constructor(private store: Store<{ store: { restaurants: Restaurant[], maliciousRequest: boolean } }>) {
    this.registerAlert();
    this.store.select('store').pipe(take(1))
      .subscribe((storeObject) => {
        this.maliciousRequest = storeObject.maliciousRequest;
        if (this.maliciousRequest) {
          this._success.next(this.alertMessage);
        }
      });
  }

  private _success = new Subject<string>();

  staticAlertClosed = false;

  successMessage = '';

  @ViewChild('staticAlert', { static: false }) staticAlert: NgbAlert | undefined ;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert | undefined;

  ngOnInit(): void {

  }

  registerAlert() {
    setTimeout(() => this.staticAlert?.close(), 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(debounceTime(2500)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
}
