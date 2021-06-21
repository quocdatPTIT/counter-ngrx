import {createReducer, on} from "@ngrx/store";
import {initialState} from "./auth.state";
import {loginSuccess} from "./auth.action";

export const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state: any, action: any) => {
    return {
      ...state,
      user: action.user,
    }
  }),
);

export const AuthReducer = (state: any, action: any) => _authReducer(state, action);
