import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {

  user: any = {};
  message: string;

  constructor() {
    this.getProfile();
  }

  ngOnInit() {}

  getProfile(){

    let userId = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(userId).get().then((documentSnapshot) => {

      this.user = documentSnapshot.data();
      // this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      console.log(this.user);

    }).catch((error) => {
      console.log(error);
    })

  }

  update(){

    this.message = "Updating...";

    let userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users').doc(userId).update({
      // first_name: this.user.displayName.split(' ')[0],
      // last_name: this.user.displayName.split(' ')[1],
      hobbies: this.user.hobbies,
      interests: this.user.interests,
      bio: this.user.bio,
    }).then(() => {

      this.message = "Bio updated successfully.";

    }).catch((error) => {
      console.log(error)
    })

  }

}