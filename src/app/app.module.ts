import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

// Page components
import { KnowPageComponent } from './know-page/know-page.component';
import { CalmPageComponent } from './calm-page/calm-page.component';
import { KoanPageComponent } from './koan-page/koan-page.component';
import { OceansModule } from './oceans/oceans.module';

@NgModule({
  declarations: [
    AppComponent,
    KnowPageComponent,
    CalmPageComponent,
    KoanPageComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    OceansModule,
  ],
  providers: [
    { provide: REGION, useValue: 'us-central1' }, //TO-DO Change to your functions location
    // { provide: StorageBucket, useValue: 'gs://malamakai.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
