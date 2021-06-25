import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {loginSuccess, signupSuccess} from "./auth.action";

export const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: any, action: any) => {
    return updateUser(state, action);
  }),
  on(signupSuccess, (state: any, action: any) => {
    return updateUser(state, action);
  })
);

const updateUser = (state: any, action: any) => {
  return {
    ...state,
    user: action.user,
  };
} ;

export const AuthReducer = (state: any, action: any) => _authReducer(state, action);
