// Angular
// -----------------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {Store} from "@ngrx/store";
import {addValue, changeChannelName} from "../store/counter.actions";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: any;
  channelName: any;
  constructor(private store: Store<AppState>) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
  }

  // Events
  // -----------------------------------------------------------------------------------------------------
  onAddValue() {
    this.store.dispatch(addValue({count: +this.value}));
  }

  onChangeChannelName() {
    this.store.dispatch(changeChannelName({channelName: this.channelName}));
  }
}
