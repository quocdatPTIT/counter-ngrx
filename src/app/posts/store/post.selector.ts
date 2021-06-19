import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "./post.state";

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = (props: {id: string}) => createSelector(
  getPostsState,
  (state) => state.posts.find(post => post.id === props.id)
);
