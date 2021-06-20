// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loginStart, loginSuccess} from "./auth.action";

// Services
// -----------------------------------------------------------------------------------------------------
import {AuthService} from "../auth.service";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {exhaustMap, map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password)
          .pipe(
            map(data => {
              const user = this.authService.formatUser(data);
              return loginSuccess({user});
            })
          )
      )
    );
  })
}
