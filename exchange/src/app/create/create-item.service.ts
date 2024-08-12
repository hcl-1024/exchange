import { Injectable } from '@angular/core';
import { db, storage, auth } from '../../../firebaseconfig'
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { Item } from '../item';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {
  constructor() { }

  async addItem(item: Item) {
    await setDoc(doc(db, "items", item.id), {
      title: item.title, 
      posterUID: item.posterUID, 
      content: item.content, 
      desc: item.desc, 
      image_src: item.image_src, 
      posted: item.posted
    });
  }

  async updateItem(id: string, item: Item) {
    const docRef = doc(db, "items", id);
    await updateDoc(docRef, {
      title: item.title, 
      posterUID: item.posterUID, 
      content: item.content, 
      desc: item.desc, 
      image_src: item.image_src, 
      posted: item.posted
    })
  }

  async getItem(id: string) {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
  }

  getUser() {
    return auth.currentUser
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

  makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  deleteImage(path: string) {
    const desertRef = ref(storage, path);
    deleteObject(desertRef)
  }

}
