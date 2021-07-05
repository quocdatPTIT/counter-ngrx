// Angular
import {Injectable} from "@angular/core";

// Ngrx
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {setLoadingSpinner} from "../../shared/store/shared.actions";
import {AppState} from "../../store/app.state";
import {addPost, addPostSuccess, loadPost, loadPostSuccess, updatePost, updatePostSuccess} from "./post.actions";

// Services
import {PostsService} from "../posts.service";

// Rxjs
import {filter, map, mergeMap, switchMap} from "rxjs/operators";

// Models
import {Post} from "../models/post.model";
import {ROUTER_NAVIGATION, RouterNavigatedAction, SerializedRouterStateSnapshot} from "@ngrx/router-store";

@Injectable({
  providedIn: 'root'
})
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService, private store: Store<AppState>) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap((action) => {
        return this.postsService.getPosts()
          .pipe(
            map((data: Post[]) => {
              this.store.dispatch(setLoadingSpinner({status: false}));
              return loadPostSuccess({posts: data});
            }),
          );
      })
    );
  })

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post)
          .pipe(
            map((data) => {
              const post = {...action.post, id: data.name};
              return addPostSuccess({post});
            })
          )
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post)
          .pipe(
            map((data) => {
              return updatePostSuccess({post: action.post});
            })
          )
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        console.log(r.payload.routerState);
        return r.payload.routerState.url.startsWith('/posts/detail');
      }),
      map((r: RouterNavigatedAction) => {
        // @ts-ignore
        return r.payload.routerState['params']['id'];
      }),
      switchMap((id) => {
        return this.postsService.getPostById(id).pipe(
          map((post) => {
            const postData = [{...post, id}];
            return loadPostSuccess({posts: postData});
          })
        )
      })
    );
  })
}
