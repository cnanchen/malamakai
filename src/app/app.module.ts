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
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { StorageBucket } from '@angular/fire/storage';

// Page components
import { KnowPageComponent } from './know-page/know-page.component';
import { BlogModule } from './blog/blog.module';
import { HelpersModule } from './helpers/helpers.module';

@NgModule({
  declarations: [
    AppComponent,
    KnowPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BlogModule,
    HelpersModule,
  ],
  providers: [
    { provide: REGION, useValue: 'us-central1' }, //TO-DO Change to your functions location
    // { provide: StorageBucket, useValue: 'gs://malamakai.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
