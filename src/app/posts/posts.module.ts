// Angular
// -----------------------------------------------------------------------------------------------------
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

// Post Component
// -----------------------------------------------------------------------------------------------------
import {PostsListComponent} from "./posts-list/posts-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";

// Ngrx
// -----------------------------------------------------------------------------------------------------
import {StoreModule} from "@ngrx/store";
import {POSTS_STATE_NAME} from "./store/post.selector";
import {postReducer} from "./store/post.reducer";

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent
      },
      {
        path: 'edit/:id',
        component: EditPostComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POSTS_STATE_NAME, postReducer),
  ],
})
export class PostsModule {}
