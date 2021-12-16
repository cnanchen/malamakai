import { Component, OnInit } from '@angular/core';
import { Koan } from './koan.model';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-koan',
  templateUrl: './koan-page.component.html',
  styleUrls: ['./koan-page.component.scss']
})
export class KoanPageComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {}

    koanCollection: AngularFirestoreCollection<Koan>;
    koanObservable: Observable<Koan[]>;

  ngOnInit() {
    // this.churchId = this.route.snapshot.paramMap.get('id');
    // Step 1: Make a reference
    this.koanCollection = this.db.collection('oceans');
    // .orderBy('createdAt')) // not working yet

    // Step 2: Get an observable of the data
    this.koanObservable = this.koanCollection.valueChanges();
  }

}
