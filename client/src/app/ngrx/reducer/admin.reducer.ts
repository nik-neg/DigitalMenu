import { createReducer, on } from '@ngrx/store';
import { retrieveRestaurans, updateRestaurants, retrieveRestauransSuccess } from '../actions/admin.actions';
import { Restaurant } from '../../restaurant/entities/restaurant';

export const initialState : {
  restaurants: Restaurant[];
} = { restaurants: [] };

export function adminReducer(state: any, action: any) {
  switch (action.type) {
    case retrieveRestaurans.type: {
      return _loginReducer(state, action);
    }
    case updateRestaurants.type: {
      return _updateReducer(state, action);
    }
    case retrieveRestauransSuccess.type: {
      return action.payload;
    }
    default:
      return _loginReducer(state, action);
  }
}

const _loginReducer = createReducer(
  initialState,
  on(retrieveRestaurans,  (state, { restaurants }) => ({
    restaurants: restaurants
  })),
);

const _updateReducer = createReducer(
  initialState,
  on(updateRestaurants,  (state, { restaurants }) => ({
      restaurants: restaurants
  })),
);

