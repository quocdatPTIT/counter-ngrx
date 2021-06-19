import {createReducer, on} from "@ngrx/store";
import {initialState} from "./post.state";
import {addPost, deletePost, updatePost} from "./post.actions";

const _postReducer = createReducer(
  initialState,
  on(addPost, (state: any, action: any) => {
    let post = {...action.post};
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, post]
    };
  }),
  on(updatePost, (state: any, action: any) => {
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
);
export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
