import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.state";
import {getAuthenticated} from "../../../auth/store/auth.selectors";
import {autoLogout} from "../../../auth/store/auth.action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(getAuthenticated);
  }

  logout() {
    this.store.dispatch(autoLogout());
  }

  goToCounter() {
    this.router.navigate(['/counter']);
  }
}
