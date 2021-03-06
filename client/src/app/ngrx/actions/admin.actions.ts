import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../../restaurant/entities/restaurant';

export const retrieveRestaurants = createAction(
  '[Login Page] Login',
  props<{ restaurants: Restaurant [], maliciousRequest: boolean }>(),
);

export const retrieveRestauransSuccess = createAction('[Login Page] Restaurants Loaded Success');

export const updateRestaurants = createAction(
  '[Update Page] Update',
  props<{ restaurants: Restaurant [] }>(),
);

export const setResetMaliciousRequest = createAction(
  '[Reset Page] SET RESET Malicious Request',
  props<{ maliciousRequest: boolean }>(),
);

export const getState = createAction(
  '[Refresh Page] Refresh',
);
