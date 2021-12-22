import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OceanService } from '../ocean.service';
import { Task } from '../ocean.model';


@Component({
  selector: 'app-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.scss']
})
export class OceanComponent {
  @Input() ocean;

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ocean.tasks, event.previousIndex, event.currentIndex);
    this.oceanService.updateTasks(this.ocean.id, this.ocean.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, oceanId: this.ocean.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.oceanService.updateTasks(this.ocean.id, [
            ...this.ocean.tasks,
            result.task
          ]);
        } else {
          const update = this.ocean.tasks;
          update.splice(result.idx, 1, result.task);
          this.oceanService.updateTasks(this.ocean.id, this.ocean.tasks);
        }
      }
    });
  }

  handleDelete() {
    this.oceanService.deleteOcean(this.ocean.id);
  }

  constructor(
    private oceanService: OceanService,
    private dialog: MatDialog
  ) {}
}
