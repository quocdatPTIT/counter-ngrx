// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Components
// -----------------------------------------------------------------------------------------------------
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
