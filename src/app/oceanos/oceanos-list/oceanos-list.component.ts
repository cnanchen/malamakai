import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { DialogComponent } from './../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface PostI {
  titlePost: string;
  contentPost: string;
  imagePost?: any;
  id?: string;
  tagsPost: string;
  fileRef?: string;
}

@Component({
  selector: 'app-oceanos-list',
  templateUrl: './oceanos-list.component.html',
  styleUrls: ['./oceanos-list.component.scss']
})
export class OceanosListComponent implements OnInit {

  tasks = []
  public userId:any = this.afAuth.auth.currentUser.uid;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    public dialog: MatDialog,
  ) {
    this.getUserTasks();
  }

  ngOnInit(): void {
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

  openDialog(post?: PostI): void {
    const config = {
      data: {
        comment: post ? 'Edit post' : 'New post',
        content: post
      }
    };

    const dialogRef = this.dialog.open(DialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

}
