// Angular
// -----------------------------------------------------------------------------------------------------
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {setLoadingSpinner} from "../../shared/store/shared.actions";
import {signupStart} from "../store/auth.action";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSignUpSubmit(): void {
    if (!this.signUpForm.valid) return;

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(signupStart({email, password}));
  }
}
