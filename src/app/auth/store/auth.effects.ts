// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginStart, loginSuccess, signupStart, signupSuccess} from "./auth.action";
import {setErrorMessage, setLoadingSpinner} from "../../shared/store/shared.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";

// Services
// -----------------------------------------------------------------------------------------------------
import {AuthService} from "../auth.service";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {catchError, exhaustMap, finalize, map, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password)
          .pipe(
            map(data => {
              const user = this.authService.formatUser(data);
              return loginSuccess({user});
            }),
            catchError(error => {
              const errMessage = this.authService.getErrorMessage(error.error.error.message);
              return of(setErrorMessage({message: errMessage}));
            }),
            finalize(() => this.store.dispatch(setLoadingSpinner({status: false})))
          )
      )
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) =>
        this.authService.signUp(action.email, action.password)
          .pipe(
            map(data => {
              const user = this.authService.formatUser(data);
              return signupSuccess({user});
            }),
            catchError(error => {
              const errMessage = this.authService.getErrorMessage(error.error.error.errors[0].message);
              return of(setErrorMessage({message: errMessage}));
            }),
            finalize(() => this.store.dispatch(setLoadingSpinner({status: false})))
          )
      )
    )
  });

  redirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(...[loginSuccess, signupSuccess]),
      tap((action) => {
        this.store.dispatch(setErrorMessage({message: ''}));
        this.router.navigate(['/']);
      })
    )
  }, {dispatch: false});
}
