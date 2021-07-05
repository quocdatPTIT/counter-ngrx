import {createAction, props} from "@ngrx/store";
import {User} from "../../shared/models/user.model";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const AUTO_LOGIN = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout action';

export const loginStart = createAction(LOGIN_START, props<{ email: string; password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS, props<{user: User | null}>());
export const signupStart = createAction(SIGNUP_START, props<{ email: string, password: string }>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User }>());
export const autoLogin = createAction(AUTO_LOGIN);
export const autoLogout = createAction(LOGOUT_ACTION);
export const dummyAction = createAction('[dummy action]');
