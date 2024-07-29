import { Injectable } from '@angular/core';
import { db, storage } from '../../../firebaseconfig'
import { collection, doc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable } from "firebase/storage";
import { Item } from '../item';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {
  constructor() { }

  async addItem(item: Item) {
    await setDoc(doc(db, "cities", item.id), {
      content: item.content, 
      image_src: item.image_src
    });
  }

  async addImage(file: File) {
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, 'images/' + file.name);
    uploadBytesResumable(storageRef, file, metadata);
    return "images/" + file.name
      //copy rest of the code to the ts file https://firebase.google.com/docs/storage/web/upload-files
  }

}
