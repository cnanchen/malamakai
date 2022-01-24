import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

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
  ) {
    this.getUserTasks();
  }

  ngOnInit(): void {
  }

  // ✅ DISPLAY INVOICES
  // of active subscriptions combined
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
            console.log('📄 USER INVOICES:', invoiceData);

            if (invoiceData.status === 'paid') {
              items.push({
                number: invoiceData.number,
                url: invoiceData.hosted_invoice_url,
                created: invoiceData.created * 1000,
                label: invoiceData.description,
                ocean: invoiceData.metadata.ocean,
                clean: invoiceData.metadata.clean,
                // icon: invoiceData.lines.data[0].nickname,
                invoiceId,
              });
            }
          });
        });
        this.tasks = items;  
      });
  }

}