import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.scss']
})
export class OceanComponent implements OnInit {

  invoices = []
  public customerId:any = this.route.snapshot.paramMap.get('id'); // public customerId:any = this.afAuth.auth.currentUser.uid;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
  ) {
    this.getUserInvoices();
  }

  ngOnInit(): void {
  }

  // ✅ DISPLAY INVOICES
  // of active subscriptions combined
  getUserInvoices() {
    const customerId = this.route.snapshot.paramMap.get('id'); // const customerId = this.afAuth.auth.currentUser.uid;
    const ref = this.afStore.collection('customers').ref;
    ref.doc(customerId)
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
                label: invoiceData.lines.data[0].price.nickname,
                clean: (invoiceData.amount_paid / 100 ) * (6), // x6 litres every 1$ spend.
                invoiceId,
              });
            }
          });
        });
        this.invoices = items;  
      });
  }

}