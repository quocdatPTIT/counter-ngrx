import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {Observable} from "rxjs";

import {Store} from "@ngrx/store";
import {AppState} from "./store/app.state";
import {getErrorMessage, getLoading} from "./shared/store/shared.selectors";
import {autoLogin} from "./auth/store/auth.action";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'learn-rxjs';
  showLoading$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
}
