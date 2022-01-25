import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { OceanComponent } from '../customers/ocean/ocean.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListPageComponent,
    DetailPageComponent,
    OceanComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
