// Angular
// -----------------------------------------------------------------------------------------------------
import {Injectable} from "@angular/core";

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
import {exhaustMap, map} from "rxjs/operators";
import {setLoadingSpinner} from "../../shared/store/shared.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private store: Store<AppState>) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password)
          .pipe(
            map(data => {
              const user = this.authService.formatUser(data);
              this.store.dispatch(setLoadingSpinner({status: false}));
              return loginSuccess({user});
            })
          )
      )
    );
  })
}
