// Angular
// -----------------------------------------------------------------------------------------------------
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {Observable} from "rxjs";

// Models
// -----------------------------------------------------------------------------------------------------
import {Post} from "../models/post.model";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getPosts} from "../store/post.selector";
import {deletePost, loadPost} from "../store/post.actions";
import {setLoadingSpinner} from "../../shared/store/shared.actions";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit {
  // @ts-ignore
  posts$: Observable<Post[]>;

  constructor(private store: Store<AppState>) {
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(loadPost());
  }

  // Events
  // -----------------------------------------------------------------------------------------------------
  onDeletePost(id: string | undefined): void {
    this.store.dispatch(deletePost({id}));
  }
}
