import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  task: AngularFireUploadTask;        // Main task 
  isHovering: boolean;                // State for dropzone CSS toggling
  percentage: Observable<number>;     // Progress monitoring
  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0)        // The File object
    // Client-side validation example
    if (!file || file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `images/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    )
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
