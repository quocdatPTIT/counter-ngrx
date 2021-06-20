// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";

// App Component
// -----------------------------------------------------------------------------------------------------
import {AppComponent} from './app.component';

// Home Component
// -----------------------------------------------------------------------------------------------------
import {HomeComponent} from './home/home.component';

// Shared Component
// -----------------------------------------------------------------------------------------------------
import {HeaderComponent} from './shared/components/header/header.component';
import {LoadingSpinnerComponent} from './shared/components/loading-spinner/loading-spinner.component';

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from "@ngrx/effects";
import {appReducer} from "./store/app.state";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      autoPause: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
