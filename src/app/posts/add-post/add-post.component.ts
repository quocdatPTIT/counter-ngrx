// Angular
// -----------------------------------------------------------------------------------------------------
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {Post} from "../models/post.model";
import {AppState} from "../../store/app.state";
import {addPost} from "../store/post.actions";

// Helpers
// -----------------------------------------------------------------------------------------------------
import {ValidationFormHelper} from "../../shared/helpers/validation-form.helper";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPostComponent implements OnInit {
  // @ts-ignore
  postForm: FormGroup;
  isSubmit = false;

  constructor(
    private store: Store<AppState>,
    private validationFormHelper: ValidationFormHelper
  ) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  // Form
  // -----------------------------------------------------------------------------------------------------
  showErrorLabel(controlName: string): string {
    return this.validationFormHelper.showErrorLabel(controlName, this.postForm, this.isSubmit);
  }

  showError(controlName: string): boolean | undefined {
    return this.validationFormHelper.showError(controlName, this.postForm, this.isSubmit);
  }

  onAddPost(): void {
    this.isSubmit = true;
    if (!this.postForm.valid) return;

    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }

    this.store.dispatch(addPost({post}));
  }
}
