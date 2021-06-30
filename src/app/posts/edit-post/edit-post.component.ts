// Angular
// -----------------------------------------------------------------------------------------------------
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

// Helpers
// -----------------------------------------------------------------------------------------------------
import {ValidationFormHelper} from "../../shared/helpers/validation-form.helper";

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
  isSubmit: boolean = false;

  private unsubscribe$ = new Subject();
  constructor(
    private router: Router,
    private cdf: ChangeDetectorRef,
    private validationFormHelper: ValidationFormHelper,
    private store: Store<AppState>
  ) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.createForm();
    this.store.select(getPostById).pipe(takeUntil(this.unsubscribe$)).subscribe((post) => {
      if (post) {
        this.post = post as Post;
        this.postForm.patchValue({
          title: post?.title,
          description: post?.description
        });
        this.cdf.detectChanges();
      }
    });
    // this.route.params.subscribe(params => {
    //   const id: string = params?.id;
    //   this.store.select(getPostById({id}))
    //     .pipe(takeUntil(this.unsubscribe$))
    //     .subscribe((data) => {
    //       if (data) { this.post = data; this.createForm(); this.cdf.detectChanges(); };
    //     })
    // })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Form
  // -----------------------------------------------------------------------------------------------------
  showErrorLabel(controlName: string): string {
    return this.validationFormHelper.showErrorLabel(controlName, this.postForm, this.isSubmit);
  }

  showError(controlName: string): boolean | undefined {
    return this.validationFormHelper.showError(controlName, this.postForm, this.isSubmit);
  }

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
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }
}
