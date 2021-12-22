import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Ocean, Task, Subscription } from './ocean.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OceanService {

  tasks = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) {}

  // Creates a new ocean for the current user
  
  async createOcean(data: Ocean) {
    const user = await this.afAuth.auth.currentUser;
    return this.afStore.collection('subscriptions').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'You found a shell!', label: '🐚' }]
    });
  }
  
  // Get all oceans owned by current user
  
  getUserOceans() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore.collection('customers')
          .doc(user.uid)
          .collection('subscriptions', ref =>
          ref.where('status', 'in', ['trialing', 'active']))
          .valueChanges({ idField: 'id' });
 
            /*
            return this.afStore
            .collection<Ocean>('oceans', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
            */
        } else {
          return [];
        }
      }),
      // map(oceans => oceans.sort((a, b) => a.priority - b.priority))
    );
  }
  
  
  // Run a batch write to change the priority of each ocean for sorting
  sortOceans(oceans: Ocean[]) {
    const afStore = firebase.firestore();
    const batch = afStore.batch();
    const refs = oceans.map(b => afStore.collection('subscriptions').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  // Delete ocean
  deleteOcean(oceanId: string) {
    return this.afStore
      .collection('subscriptions')
      .doc(oceanId)
      .delete();
  }

  // Updates the tasks on ocean
  updateTasks(oceanId: string, tasks: Task[]) {
    return this.afStore
      .collection('subscriptions')
      .doc(oceanId)
      .update({ tasks });
  }

  // Remove a specifc task from the ocean
  removeTask(oceanId: string, task: Task) {
    return this.afStore
      .collection('subscriptions')
      .doc(oceanId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /*
  // ✅ DISPLAY INVOICES
  getUserInvoices() {
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
                label: invoiceData.metadata.label,
                invoiceId,
              });
            }
          });
        });
        this.tasks = items;  
      });
  }*/
}
