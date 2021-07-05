import {Post} from "../models/post.model";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface PostState {
  posts: Post[];
}
//
// export const initialState: PostState = {
//   posts: []
// }

export interface PostsState extends EntityState<Post> {}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState();
