import { createReducer, on } from '@ngrx/store';
import { setAdminPrivileges, removeAdminPrivileges, reset } from '../actions/admin.actions';

export const initialState = false;

const _adminReducer = createReducer(
  initialState,
  on(setAdminPrivileges, (state) => true),
  on(removeAdminPrivileges, (state) => false),
  on(reset, (state) => false)
);

export function adminReducer(state: any, action: any) {
  console.log("reducer works", state);
  return _adminReducer(state, action);
}