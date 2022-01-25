import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnowPageComponent } from './know-page/know-page.component';
import { CalmPageComponent } from './calm-page/calm-page.component';
import { KoanPageComponent } from './koan-page/koan-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';

import { AuthGuard } from './user/auth.guard';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
  },
  {
    path: 'kanban',
    loadChildren: () => import('./kanban/ocean.module').then(m => m.KanbanModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'ocean',
    loadChildren: () => import('./ocean/ocean.module').then(m => m.OceanModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'oceans',
    loadChildren: () => import('./oceans/oceans.module').then(m => m.OceansModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'oceanos',
    loadChildren: () => import('./oceanos/oceanos.module').then(m => m.OceanosModule),
    // canActivate: [AuthGuard]
  },
  { path: 'know', component: KnowPageComponent },
  { path: 'meditate', component: CalmPageComponent },
  { path: 'koan', component: KoanPageComponent },
  { path: 'profile', component: LoginPageComponent },

  { path: 'oceanos', loadChildren: () => import('./oceanos/oceanos.module').then(m => m.OceanosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule {}