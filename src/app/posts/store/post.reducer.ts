import {createReducer, on} from "@ngrx/store";
import {initialState} from "./post.state";
import {addPostSuccess, deletePost, loadPostSuccess, updatePostSuccess} from "./post.actions";

const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state: any, action: any) => {
    let post = {...action.post};

    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(updatePostSuccess, (state: any, action: any) => {
    const updatedPosts = state.posts.map((post: any) => {
      return post.id === action.post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state: any, action: any) => {
    const updatedPosts = state.posts.filter((post: any) => post.id !== action.id);
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(loadPostSuccess, (state: any, action: any) => {
    return {
      ...state,
      posts: action.posts
    }
  })
);
export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
