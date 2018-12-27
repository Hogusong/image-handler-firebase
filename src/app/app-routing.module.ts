import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadComponent } from './pages/upload/upload.component';
import { DownloadComponent } from './pages/download/download.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'download', component: DownloadComponent },
  { path: 'about', component: AboutComponent }
] 

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
