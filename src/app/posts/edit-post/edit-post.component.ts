// Angular
// -----------------------------------------------------------------------------------------------------
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getPostById} from "../store/post.selector";

// Models
// -----------------------------------------------------------------------------------------------------
import {Post} from "../models/post.model";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {updatePost} from "../store/post.actions";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostComponent implements OnInit, OnDestroy {
  // @ts-ignore
  post: Post;
  // @ts-ignore
  postForm: FormGroup;

  private unsubscribe$ = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdf: ChangeDetectorRef,
    private store: Store<AppState>) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id: string = params?.id;
      this.store.select(getPostById({id}))
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          if (data) { this.post = data; this.createForm(); this.cdf.detectChanges(); };
        })
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Form
  // -----------------------------------------------------------------------------------------------------
  onUpdatePost(): void {
    if (!this.postForm.valid) return;

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts'])
  }

  private createForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
  }
}