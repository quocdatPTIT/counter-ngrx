// Angular
// -----------------------------------------------------------------------------------------------------
import {Component, OnInit} from '@angular/core';

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {decrement, increment, reset} from "../store/counter.actions";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.scss']
})
export class CounterButtonsComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
  }

  // Events
  // -----------------------------------------------------------------------------------------------------
  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
