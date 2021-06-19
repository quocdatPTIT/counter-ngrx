// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

// Counter Component
// -----------------------------------------------------------------------------------------------------
import {CounterComponent} from "./counter/counter.component";
import {CounterOutputComponent} from "./counter-output/counter-output.component";
import {CounterButtonsComponent} from "./counter-buttons/counter-buttons.component";
import {CustomCounterInputComponent} from "./custom-counter-input/custom-counter-input.component";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {StoreModule} from "@ngrx/store";
import {COUNTER_STATE_NAME} from "./store/counter.selectors";
import {counterReducer} from "./store/counter.reducer";

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
]

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  ],
})
export class CounterModule {}
