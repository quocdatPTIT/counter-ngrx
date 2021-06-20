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

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      autoPause: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
