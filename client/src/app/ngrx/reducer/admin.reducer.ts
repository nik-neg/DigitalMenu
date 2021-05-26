import { createReducer, on } from '@ngrx/store';
import {
  retrieveRestaurans,
  retrieveRestauransSuccess,
  setResetMaliciousRequest,
  updateRestaurants,
  getState
} from '../actions/admin.actions';
import { Restaurant } from '../../restaurant/entities/restaurant';

export const initialState: {
  restaurants: Restaurant[];
  maliciousRequest: boolean;
} = {
  restaurants: [],
  maliciousRequest: false,
};

export function adminReducer(state: any, action: any) {
  switch (action.type) {
    case retrieveRestaurans.type: {
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
    retrieveRestaurans,
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
    (state, { restaurants, maliciousRequest }) => ({
      restaurants,
      maliciousRequest,
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
