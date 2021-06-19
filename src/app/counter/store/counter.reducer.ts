import {createReducer, on} from "@ngrx/store";
import {initialState} from "./counter.state";
import {addValue, changeChannelName, decrement, increment, reset} from "./counter.actions";

const _counterReducer = createReducer(
  initialState,
  on(increment, (state: any) => {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }),
  on(decrement, (state: any) => {
    return {
      ...state,
      counter: state.counter - 1,
    }
  }),
  on(reset, (state: any) => {
    return {
      ...state,
      counter: 0,
    }
  }),
  on(addValue, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count
    }
  }),
  on(changeChannelName, (state, action) => {
    return {
      ...state,
      channelName: action.channelName
    }
  })
)

export const counterReducer = (state: any, action: any) => _counterReducer(state, action);
