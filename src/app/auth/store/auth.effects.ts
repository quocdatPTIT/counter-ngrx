// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginStart, loginSuccess} from "./auth.action";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";

// Services
// -----------------------------------------------------------------------------------------------------
import {AuthService} from "../auth.service";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {catchError, exhaustMap, map, tap} from "rxjs/operators";
import {setErrorMessage, setLoadingSpinner} from "../../shared/store/shared.actions";
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
              this.store.dispatch(setLoadingSpinner({status: false}));
              this.store.dispatch(setErrorMessage({message: ''}));
              return loginSuccess({user});
            }),
            catchError(error => {
              const errMessage = this.authService.getErrorMessage(error.error.error.message);
              this.store.dispatch(setLoadingSpinner({status: false}));
              return of(setErrorMessage({message: errMessage}));
            })
          )
      )
    );
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap((action) => this.router.navigate(['/']))
    )
  }, {dispatch: false});
}
