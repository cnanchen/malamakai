import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Ocean, Task } from './ocean.model';
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OceanService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  // Creates a new ocean for the current user
  async createOcean(data: Ocean) {
    const user = await this.afAuth.auth.currentUser;
    return this.db.collection('oceans').add({
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
          return this.db
            .collection<Ocean>('oceans', ref =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      }),
      // map(oceans => oceans.sort((a, b) => a.priority - b.priority))
    );
  }

  // Run a batch write to change the priority of each ocean for sorting
  sortOceans(oceans: Ocean[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = oceans.map(b => db.collection('oceans').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }

  // Delete ocean
  deleteOcean(oceanId: string) {
    return this.db
      .collection('oceans')
      .doc(oceanId)
      .delete();
  }

  // Updates the tasks on ocean
  updateTasks(oceanId: string, tasks: Task[]) {
    return this.db
      .collection('oceans')
      .doc(oceanId)
      .update({ tasks });
  }

  // Remove a specifc task from the ocean
  removeTask(oceanId: string, task: Task) {
    return this.db
      .collection('oceans')
      .doc(oceanId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }
}
