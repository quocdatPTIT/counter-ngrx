// Angular
// -----------------------------------------------------------------------------------------------------
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

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

  }

  private createForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)])
    });
  }
}
