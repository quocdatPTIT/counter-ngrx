// Angular
// -----------------------------------------------------------------------------------------------------
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

// Functions
// -----------------------------------------------------------------------------------------------------
import {ValidationFormHelper} from "../../shared/helpers/validation-form.helper";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {loginStart} from "../store/auth.action";
import {setLoadingSpinner} from "../../shared/store/shared.actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  loginForm: FormGroup;

  isLogin: boolean = false;

  constructor(private validationFormHelper: ValidationFormHelper, private store: Store<AppState>) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  // Form
  // -----------------------------------------------------------------------------------------------------
  showErrorLabel(controlName: string): string {
    return this.validationFormHelper.showErrorLabel(controlName, this.loginForm, this.isLogin);
  }

  showError(controlName: string): boolean | undefined {
    return this.validationFormHelper.showError(controlName, this.loginForm, this.isLogin);
  }

  onLoginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(loginStart({email, password}));
  }
}
