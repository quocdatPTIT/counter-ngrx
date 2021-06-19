// Angular
// -----------------------------------------------------------------------------------------------------
import {Component, OnInit} from '@angular/core';

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {getChannelName, getCounter} from "../store/counter.selectors";

// Rxjs
// -----------------------------------------------------------------------------------------------------
import {Observable} from "rxjs";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  // @ts-ignore
  counter$: Observable<number>;

  // @ts-ignore
  channelName$: Observable<string>;

  constructor(private store: Store<AppState>) {
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.counter$ = this.store.select(getCounter);
    this.channelName$ = this.store.select(getChannelName);
  }

}
