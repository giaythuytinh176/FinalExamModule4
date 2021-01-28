import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from './component/book-list/book-list.component';
import {BookCreateComponent} from './component/book-create/book-create.component';
import {BookEditComponent} from './component/book-edit/book-edit.component';
import {BookDetailComponent} from './component/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'add', component: BookCreateComponent },
  { path: 'update/:id', component: BookEditComponent },
  { path: 'details/:id', component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
