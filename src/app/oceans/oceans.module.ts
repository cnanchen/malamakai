import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OceansRoutingModule } from './oceans-routing.module';
import { OceanListComponent } from './ocean-list/ocean-list.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
// import { OceanComponent } from './ocean/ocean.component';
import { FormsModule } from '@angular/forms';
import { OceanDialogComponent } from './dialogs/ocean-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskDialogComponent } from './dialogs/task-dialog.component';

@NgModule({
  declarations: [
    OceanListComponent,
    
    OceanDialogComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    OceansRoutingModule,
    SharedModule,

    RouterModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [OceanDialogComponent, TaskDialogComponent]
})
export class OceansModule { }
