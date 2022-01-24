import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

export interface FileI {
  name: string;
  imageFile: File;
  size: string;
  type: string;
}

export interface UserI {
  email: string;
  password?: string;
  displayName?: string;
  photoURL?: string;
  uid?: string;
  phoneNumber?: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {

  public image: FileI;
  public currentImage = '/assets/defaultUser.jpg';
  public userData$: Observable<firebase.User>;
  private filePath: string;
  message: string;

  constructor(
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    private db: AngularFirestore)
  {
    this.userData$ = afAuth.authState;    
  }


  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.userData$.subscribe(user => {
      this.initValuesForm(user);

    });
  }

  onSaveUser(user: UserI): void {
    this.preSaveUserProfile(user, this.image);
  }

  private initValuesForm(user: UserI): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }

    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    });
  }

  handleImage(image: FileI): void {
    this.image = image;
  }

  preSaveUserProfile(user: UserI, image?: FileI): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: UserI, image: FileI): void {
    this.filePath = `profiles/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }
  
  private saveUserProfile(user: UserI) {
    this.message = "Updating...";

    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    })
    // Save copy on firestore
    let userId = this.afAuth.auth.currentUser.uid
    this.db.collection('users').doc(userId).update({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
    .then(() => this.message = "Bio updated successfully.")
    .catch(err => console.log('Error', err));

  }

}