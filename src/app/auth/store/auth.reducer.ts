import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {autoLogin, autoLogout, loginSuccess, signupSuccess} from "./auth.action";

export const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: any, action: any) => {
    return updateUser(state, action);
  }),
  on(signupSuccess, (state: any, action: any) => {
    return updateUser(state, action);
  }),
  on(autoLogout, (state: any, action: any) => {
    return {
      ...state,
      user: null,
    };
  })
);

const updateUser = (state: any, action: any) => {
  return {
    ...state,
    user: action.user,
  };
} ;

export const AuthReducer = (state: any, action: any) => _authReducer(state, action);
