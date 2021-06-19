import {CounterState} from "../counter/store/counter.state";
import {PostState} from "../posts/store/post.state";
import {counterReducer} from "../counter/store/counter.reducer";
import {postReducer} from "../posts/store/post.reducer";

export interface AppState {
  counter: CounterState,
  posts: PostState
}

export const appReducer = {
  counter: counterReducer,
  posts: postReducer,
};
