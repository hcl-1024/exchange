import { Injectable } from '@angular/core';
import { db, storage, auth } from '../../../firebaseconfig'
import { collection, doc, getDoc, getDocs, query, where, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { ref, getDownloadURL } from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class ReadItemService {

  constructor() { }

  getUser() {
    return auth.currentUser
  }

  async getAllItems() {
    const q = query(collection(db, "items"), where("posted", "==", true));
    return await getDocs(q);
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
    const q = query(collection(db, "comments"), where("item_id", "==", id));
    const querySnapshot = await getDocs(q);

    return querySnapshot;
  }

  async getOwnFiles(uid: string) {
    const q = query(collection(db, "items"), where("posterUID", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot
  }

  async like(id: string, uid: string) {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data()
    if(!data!.likesUsers.includes(uid)){
      await updateDoc(docRef, {
        likesUsers: arrayUnion(uid)
      })
    } else {
        await updateDoc(docRef, {
        likesUsers: arrayRemove(uid)
    })}
  }

  async deleteItem(id: string) {
    await deleteDoc(doc(db, "items", id));
  }

}