// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

// App Component
// -----------------------------------------------------------------------------------------------------
import {AppComponent} from './app.component';

// Counter Component
// -----------------------------------------------------------------------------------------------------
import {CounterComponent} from './counter/counter/counter.component';
import {CounterOutputComponent} from './counter/counter-output/counter-output.component';
import {CustomCounterInputComponent} from './counter/custom-counter-input/custom-counter-input.component';
import {CounterButtonsComponent} from './counter/counter-buttons/counter-buttons.component';

// Home Component
// -----------------------------------------------------------------------------------------------------
import {HomeComponent} from './home/home.component';

// Shared Component
// -----------------------------------------------------------------------------------------------------
import {HeaderComponent} from './shared/components/header/header.component';

// Post Component
// -----------------------------------------------------------------------------------------------------
import {PostsListComponent} from './posts/posts-list/posts-list.component';
import {AddPostComponent} from './posts/add-post/add-post.component';
import {EditPostComponent} from './posts/edit-post/edit-post.component';

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {appReducer} from "./store/app.state";

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostsListComponent,
    AddPostComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
