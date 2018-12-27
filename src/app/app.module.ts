import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UploadComponent } from './pages/upload/upload.component';
import { DownloadComponent } from './pages/download/download.component';
import { AboutComponent } from './pages/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UploadComponent,
    DownloadComponent,
    AboutComponent,
    DropZoneDirective,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'image-handler'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
