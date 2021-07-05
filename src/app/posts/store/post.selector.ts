import {createFeatureSelector, createSelector} from "@ngrx/store";
import {postsAdapter, PostState} from "./post.state";
import {getCurrentRoute} from "../../store/router-store/router.selector";
import {RouterStateUrl} from "../../store/router-store/custom-route-serializer";

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostState>(POSTS_STATE_NAME);
export const postsSelectors = postsAdapter.getSelectors();

// @ts-ignore
export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);

// @ts-ignore
export const getPostsEntities = createSelector(getPostsState, postsSelectors.selectEntities);

// export const getPostById = createSelector(
//   getPosts,
//   getCurrentRoute,
//   (posts, route) => {
//     return posts ? posts.find((post) => post.id === route.params['id']) : null
//   });

export const getPostById = createSelector(
  getPostsEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
)
