// Angular
import { Component, OnInit } from '@angular/core';

// Rxjs
import {Observable} from "rxjs";

// Ngrx
import {Post} from "../models/post.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getPostById} from "../store/post.selector";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post$: Observable<Post>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.post$ = this.store.select(getPostById) as Observable<Post>;
  }

}
