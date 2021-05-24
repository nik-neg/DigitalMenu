import { createReducer, on } from '@ngrx/store';
import { receiveRestaurants, updateRestaurants, reset } from '../actions/restaurant.actions';

export const initialState = [];

const _adminReducer = createReducer(
  initialState,
  on(receiveRestaurants, (state, id) => {
    const restaurant = state.indexOf(id);
  }),
  on(updateRestaurants, (state) => false),
  on(reset, (state) => [])
);

export function adminReducer(state: any, action: any) {
  console.log("reducer works", state);
  return _adminReducer(state, action);
}