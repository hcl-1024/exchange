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

  async findUser(id: string) {
    const userRef = doc(db, "users", id);
    const docSnap = await getDoc(userRef);

    return docSnap.data()
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

  async signUpUser(uid: string, docId: string) {
    const docRef = doc(db, "items", docId);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data()
    if(!data!.signUpUsers.includes(uid)){
      await updateDoc(docRef, {
        signUpUsers: arrayUnion(uid)
      })
    } else {
        await updateDoc(docRef, {
          signUpUsers: arrayRemove(uid)
    })}
  }

  async getSignedUsers(id: string) {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data()
    return data!.signUpUsers
  }

  async deleteItem(id: string) {
    await deleteDoc(doc(db, "items", id));
  }

}