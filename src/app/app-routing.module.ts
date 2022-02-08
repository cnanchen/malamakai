import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowPageComponent } from './know-page/know-page.component';

import { AuthGuard } from './user/auth.guard';

const routes: Routes = [

  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: '',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
  },
  /*
  {
    path: 'ocean',
    loadChildren: () => import('./ocean/ocean.module').then(m => m.OceanModule),
    // canActivate: [AuthGuard]
  },*/

  { path: 'know', component: KnowPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}