import { createReducer, on } from '@ngrx/store';
import {
  retrieveRestaurants,
  retrieveRestauransSuccess,
  setResetMaliciousRequest,
  updateRestaurants,
} from '../actions/admin.actions';
import { Restaurant } from '../../restaurant/entities/restaurant';

export const initialState: {
  restaurants: Restaurant[];
  maliciousRequest: boolean;
} = {
  restaurants: [],
  maliciousRequest: false,
}; // val for re-hydration modus

export function adminReducer(state: any, action: any) {
  switch (action.type) {
    case retrieveRestaurants.type: {
      return _loginReducer(
        state,
        action,
      );
    }
    case retrieveRestauransSuccess.type: {
      return action.payload;
    }
    case updateRestaurants.type: {
      return _updateReducer(
        state,
        action,
      );
    }
    case setResetMaliciousRequest.type: {
      return _updateMaliciousStateReducer(
        state,
        action,
      );
    }
    default: console.log('default')
      return state;
  }
}

const _loginReducer = createReducer(
  initialState,
  on(
    retrieveRestaurants,
    (state, { restaurants, maliciousRequest }) => ({
      restaurants,
      maliciousRequest,
    }),
  ),
);

const _updateReducer = createReducer(
  initialState,
  on(
    updateRestaurants,
    (state, { restaurants }) => ({
      restaurants,
      maliciousRequest: state.maliciousRequest
    }),
  ),
);
const _updateMaliciousStateReducer = createReducer(
  initialState,
  on(
    setResetMaliciousRequest,
    (state, { maliciousRequest }) => ({
      restaurants: state.restaurants,
      maliciousRequest: maliciousRequest,
    }),
  ),
);
