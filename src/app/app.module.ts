// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

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
import {AuthEffects} from "./auth/store/auth.effects";
import {AuthTokenInterceptor} from "./shared/intercepors/auth-token.interceptor";

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
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      autoPause: false
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
