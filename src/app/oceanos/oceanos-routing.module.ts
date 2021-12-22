import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OceanosListComponent } from './oceanos-list/oceanos-list.component';

const routes: Routes = [
  { path: '', component: OceanosListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OceanosRoutingModule { }
