import { Injectable } from '@angular/core';
import { db, storage } from '../../../../firebaseconfig'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"; 
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
    return await getDownloadURL(imgRef)
  }

  async getComment(id: string) {
    const q = query(collection(db, "cities"), where("item_id", "==", id));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  }

}