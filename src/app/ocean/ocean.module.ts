import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OceanRoutingModule } from './ocean-routing.module';
import { OceansListComponent } from './oceans-list/oceans-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { OceanComponent } from './ocean/ocean.component';
import { FormsModule } from '@angular/forms';
import { OceanDialogComponent } from './dialogs/ocean-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskDialogComponent } from './dialogs/task-dialog.component';

@NgModule({
  declarations: [
    OceansListComponent,
    OceanComponent,
    OceanDialogComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    OceanRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
  entryComponents: [OceanDialogComponent, TaskDialogComponent]
})
export class OceanModule {}
