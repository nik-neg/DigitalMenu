import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiClientService } from '../../api-client.service';

@Injectable()
export class RestaurantEffects {
  restaurants$ = createEffect(() => this.actions$.pipe(
    ofType('[Login Page] Login'),
    mergeMap(() => this.apiClient.getRestaurants('restaurants')
      .pipe(
        map((restaurants) => ({
          type: '[Login Page] Restaurants Loaded Success',
          payload: {
            restaurants,
            maliciousRequest: false,
          },
        })),
        catchError(() => EMPTY),
      )),
  ));

  constructor(
    private actions$: Actions,
    private apiClient: ApiClientService,
  ) {}
}
