import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "./post.state";
import {getCurrentRoute} from "../../store/router-store/router.selector";

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route) => {
    return posts ? posts.find((post) => post.id === route.params['id']) : null
  });
