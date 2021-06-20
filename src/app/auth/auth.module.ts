// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

// Components
// -----------------------------------------------------------------------------------------------------
import {LoginComponent} from './login/login.component';

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {StoreModule} from "@ngrx/store";
import {AUTH_STATE_NAME} from "./store/auth.selectors";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./store/auth.effects";
import {authReducer} from "./store/auth.reducer";

import {AuthService} from "./auth.service";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes),
    StoreModule.forFeature(AUTH_STATE_NAME, authReducer)
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
