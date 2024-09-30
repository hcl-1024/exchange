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
    try {
    await setDoc(doc(db, "items", item.id), {
      title: item.title, 
      posterUID: item.posterUID, 
      content: item.content, 
      desc: item.desc, 
      image_src: item.image_src, 
      posted: item.posted
    });} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async updateItem(id: string, item: Item) {
    try {
    const docRef = doc(db, "items", id);
    await updateDoc(docRef, {
      title: item.title, 
      posterUID: item.posterUID, 
      content: item.content, 
      desc: item.desc, 
      image_src: item.image_src, 
      posted: item.posted
    })} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async getItem(id: string) {
    try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data()} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  getUser() {
    return auth.currentUser
  }

  async addImage(file: File) {
    try {
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, 'images/' + file.name);
    uploadBytesResumable(storageRef, file, metadata);
    return "images/" + file.name} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
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
    try {
    const desertRef = ref(storage, path);
    deleteObject(desertRef)} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

}
