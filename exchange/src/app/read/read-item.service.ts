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
    try {
    const q = query(collection(db, "items"), where("posted", "==", true));
    return await getDocs(q);} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async findUser(id: string) {
    try {
    const userRef = doc(db, "users", id);
    const docSnap = await getDoc(userRef);

    return docSnap.data()} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async getItem(id: string) {
    try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    return docSnap;} catch(e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async getImg(src: string) {
    try {
    const imgRef = ref(storage, src);
    return await getDownloadURL(imgRef)} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async getComment(id: string) {
    try {
    const q = query(collection(db, "comments"), where("item_id", "==", id));
    const querySnapshot = await getDocs(q);

    return querySnapshot;} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async getOwnFiles(uid: string) {
    try {
    const q = query(collection(db, "items"), where("posterUID", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async like(id: string, uid: string) {
    try {
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
    })}} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async signUpUser(uid: string, docId: string) {
    try {
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
    })}} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async getSignedUsers(id: string) {
    try {
    const docRef = doc(db, "items", id);
    const docSnap = await getDoc(docRef);

    const data = docSnap.data()
    return data!.signUpUsers} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async deleteItem(id: string) {
    try {
    await deleteDoc(doc(db, "items", id));} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

}