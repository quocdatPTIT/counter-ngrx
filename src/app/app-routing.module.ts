// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Components
// -----------------------------------------------------------------------------------------------------
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {SinglePostComponent} from "./posts/single-post/single-post.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'posts/detail/:id',
    component: SinglePostComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
