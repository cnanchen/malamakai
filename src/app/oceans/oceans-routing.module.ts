import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OceanListComponent } from './ocean-list/ocean-list.component';

const routes: Routes = [
  { path: '', component: OceanListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OceansRoutingModule { }
