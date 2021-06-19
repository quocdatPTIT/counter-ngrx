import {createReducer, on} from "@ngrx/store";
import {initialState} from "./post.state";
import {addPost} from "./post.actions";

const _postReducer = createReducer(
  initialState,
  on(addPost, (state: any, action: any) => {
    let post = {...action.post};
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post]
    }
  })
);
export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
