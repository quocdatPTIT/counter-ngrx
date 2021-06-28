// Angular
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";

// Rxjs
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

// Ngrx
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {getAuthenticated} from "../../auth/store/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate{
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getAuthenticated).pipe(
      map((authenticate) => {
        if (!authenticate) return this.router.createUrlTree(['auth']);
        return true;
      })
    )
  }

}
