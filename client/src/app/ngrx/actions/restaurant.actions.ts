import { createAction } from '@ngrx/store';

export const receiveRestaurants = createAction('[Restaurant Component] ReceiveRestaurants');
export const updateRestaurants = createAction('[Restaurant Component] UpdateRestaurants');
export const reset = createAction('[Restaurant Component] Reset');