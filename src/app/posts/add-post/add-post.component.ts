// Angular
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

// Functions
import {firstCapitalizeString} from "../../shared/prototypes/string-capitalize";

// Ngrx
import {Store} from "@ngrx/store";
import {Post} from "../models/post.model";
import {AppState} from "../../store/app.state";
import {addPost} from "../store/post.actions";

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

  constructor(private store: Store<AppState>) {
  }

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
    const formControl: AbstractControl | null = this.postForm.get(controlName);
    if (formControl?.touched && !formControl.valid) {
      if (formControl?.errors?.required) {
        return `${firstCapitalizeString(controlName)} is required`;
      }

      if (formControl?.errors?.minlength) {
        const minLength = controlName === 'title' ? 6 : 10;
        return `${firstCapitalizeString(controlName)} should be of minimum ${minLength} characters length`;
      }
    }

    if (this.isSubmit && formControl?.untouched && !formControl.valid)
      return `${firstCapitalizeString(controlName)} is required`;

    return '';
  }

  showError(controlName: string): boolean | undefined {
    const formControl: AbstractControl | null = this.postForm.get(controlName);
    return (this.isSubmit && formControl?.untouched && !formControl.valid)
      || (formControl?.touched && !formControl.valid);
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
