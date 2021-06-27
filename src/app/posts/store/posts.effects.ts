// Angular
import {Injectable} from "@angular/core";

// Ngrx
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {setLoadingSpinner} from "../../shared/store/shared.actions";
import {AppState} from "../../store/app.state";
import {loadPost, loadPostSuccess} from "./post.actions";

// Services
import {PostsService} from "../posts.service";

// Rxjs
import {finalize, map, mergeMap} from "rxjs/operators";

// Models
import {Post} from "../models/post.model";

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
              return loadPostSuccess({posts: data});
            }),
            finalize(() => this.store.dispatch(setLoadingSpinner({status: false})))
          );
      })
    )
  })
}
