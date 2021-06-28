import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getAuthenticated = createSelector(getAuthState, (state) => state.user ? true : false);

export const getToken = createSelector(getAuthState, (state) => state.user ? state.user.userToken : null);
