import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OceanService } from '../ocean.service';
import { Task } from '../ocean.model';

@Component({
  templateUrl: './ocean-list.component.html',
  styleUrls: ['./ocean-list.component.scss']
})
export class OceanListComponent implements OnInit {

  @Input() ocean;



  tasks = [];
  public userId:any = this.afAuth.auth.currentUser.uid;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,


    private oceanService: OceanService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getUserTasks();
  }

  // ✅ DISPLAY INVOICES
  getUserTasks() {
    const userId = this.afAuth.auth.currentUser.uid;
    const ref = this.afStore.collection('customers').ref;
    ref.doc(userId)
      .collection('subscriptions')
      .where('status', 'in', ['trialing', 'active'])
      .get()
      .then(querySnapshot => {
        const items = [];
        querySnapshot.forEach(async function (doc) {
          const invoiceSnap = await doc.ref
            .collection('invoices')
            .where('status', '==', 'paid')
            //.orderBy('unit_amount')
            .get();

          invoiceSnap.docs.forEach((doc) => {
            const invoiceId = doc.id;
            const invoiceData = doc.data();
            // console.log('📄 USER INVOICES:', invoiceData);

            if (invoiceData.status === 'paid') {
              items.push({
                number: invoiceData.number,
                url: invoiceData.hosted_invoice_url,
                created: invoiceData.created * 1000,
                label: invoiceData.metadata.label,
                invoiceId,
              });
            }
          });
        });
        this.tasks = items;  
      });
  }





  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.ocean.tasks, event.previousIndex, event.currentIndex);
    this.oceanService.updateTasks(this.ocean.id, this.ocean.tasks);
  }

  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, /*oceanId: this.ocean.id, idx */}
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

}