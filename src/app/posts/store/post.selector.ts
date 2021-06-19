import {createFeatureSelector, createSelector, DefaultProjectorFn} from "@ngrx/store";
import {PostState} from "./post.state";
import {Post} from "../models/post.model";

const getPostsState = createFeatureSelector<PostState>('posts');

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = (props: {id: string}) => createSelector(
  getPostsState,
  (state) => state.posts.find(post => post.id === props.id)
);
