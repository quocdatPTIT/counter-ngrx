import {Post} from "../models/post.model";

export interface PostState {
  posts: Post[];
}

export const initialState: PostState = {
  posts: [
    { id: '1', title: 'Sample title 1', description: 'Sample description 1' },
    { id: '2', title: 'Sample title 2', description: 'Sample description 2' },
  ],
}
