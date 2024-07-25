import { Injectable } from '@angular/core';
import { db, storage } from '../../../../firebaseconfig'
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
import { ref, getDownloadURL } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class ReadItemService {

  constructor() { }

  async getAllItems() {
    return await getDocs(collection(db, "items"));
  }

  async getItem(id: string) {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    return docSnap;
  }

  async getImg(src: string) {
    const imgRef = ref(storage, src);
    getDownloadURL(imgRef)
    .then((url) => {
      return url
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          throw new Error('storage/object-not-found')
          break;
        case 'storage/unauthorized':
          throw new Error('storage/unauthorized')
          break;
        case 'storage/canceled':
          throw new Error('storage/canceled')
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
  })
  }

}