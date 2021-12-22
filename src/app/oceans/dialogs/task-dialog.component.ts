import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OceanService } from '../ocean.service';

@Component({
  selector: 'app-task-dialog',
  styleUrls: ['./dialog.scss'],
  template: `
    <h1 mat-dialog-title>Task</h1>
    
    <div mat-dialog-content class="content">
      <mat-form-field>
        <textarea placeholder="Task description" matInput [(ngModel)]="data.task.description"></textarea>
      </mat-form-field>
      
      <br/>

      <mat-button-toggle-group class="grid" #group="matButtonToggleGroup" [(ngModel)]="data.task.label">
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">
            <!-- {{opt === 'gray' ? 'check_circle' : 'lens'}} -->
            {{opt}}
          </mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
      
    </div>

    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>

      <app-delete-button (delete)="handleTaskDelete()" *ngIf="!data.isNew"></app-delete-button>
    </div>
  `
})
export class TaskDialogComponent {
  labelOptions = ['🐚','🦐','🦀','🦞','🐟','🐠','🐡','🐙','🦑','🐬','🦈','🐋'];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private oceanService: OceanService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.oceanService.removeTask(this.data.oceanId, this.data.task);
    this.dialogRef.close();
  }
}
