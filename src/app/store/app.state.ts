import {SHARED_STATE_NAME} from "../shared/store/shared.selectors";
import {SharedState} from "../shared/store/shared.state";
import {SharedReducer} from "../shared/store/shared.reducer";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
};
