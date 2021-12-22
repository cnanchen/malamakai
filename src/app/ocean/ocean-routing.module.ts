import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OceansListComponent } from './oceans-list/oceans-list.component';


const routes: Routes = [
  { path: '', component: OceansListComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OceanRoutingModule { }

