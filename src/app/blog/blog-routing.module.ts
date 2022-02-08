import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  { path: 'page', component: PageComponent },
  { path: 'page/:id', component: DetailComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
