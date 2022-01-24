import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OceanosRoutingModule } from './oceanos-routing.module';
import { OceanosListComponent } from './oceanos-list/oceanos-list.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    OceanosListComponent,
  ],
  imports: [
    CommonModule,
    OceanosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OceanosModule { }
