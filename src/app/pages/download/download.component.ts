import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  photosCollection: AngularFirestoreCollection<any>;
  photoDoc: AngularFirestoreDocument<any>;
  photos: any[];
  img_url: any;

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) {
    this.photosCollection = this.db.collection('photos', ref => ref);
  }

  ngOnInit() {
    this.photosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data();
        return data;
      })
    })).subscribe(data => { this.photos = data })
  }

  showImage(name) {
    this.storage.ref(name).getDownloadURL().subscribe(url => {
      this.img_url = url;
    });
  }
}
