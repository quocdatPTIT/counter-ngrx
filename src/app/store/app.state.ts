import {SHARED_STATE_NAME} from "../shared/store/shared.selectors";
import {SharedState} from "../shared/store/shared.state";
import {SharedReducer} from "../shared/store/shared.reducer";
import {AUTH_STATE_NAME} from "../auth/store/auth.selectors";
import {AuthState} from "../auth/store/auth.state";
import {AuthReducer} from "../auth/store/auth.reducer";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};
