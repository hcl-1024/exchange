import { Injectable } from '@angular/core';
import { auth, storage, db } from '../../../firebaseconfig';
import { User } from '../user';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, RecaptchaVerifier, signInWithPhoneNumber, updateProfile, updateEmail, reauthenticateWithCredential, AuthCredential, updatePassword } from "firebase/auth";
import { ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { FireUser } from '../fire-user';
import { Password } from '../password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  ) { }

  async emailSignup(user: User) {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
      const u = auth.currentUser
      await setDoc(doc(db, "users", u!.uid), u);
    } catch (e: any) {
      switch (e.code) {
        case "auth/wrong-password": 
          throw new Error("The password is wrong! ")
        case "auth/invalid-email": 
          throw new Error("The email is wrong")
        default: 
          throw new Error("An unexpected error ocurred... ")
      }
    }
  }

  async emailSignin(user: User) {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password)
    } catch (e: any) {
      switch (e.code) {
        case "auth/wrong-password": 
          throw new Error("The password is wrong! ")
        case "auth/invalid-email": 
          throw new Error("The email is wrong")
        default: 
          throw new Error("An unexpected error ocurred... ")
      }
    }
  }

  getUser() {
    return auth.currentUser
  }

  async updateDisplayName(name: string) {
    try {
    await updateProfile(auth.currentUser!, {
      displayName: name
    })

    const userRef = doc(db, "users", auth.currentUser!.uid);

    await updateDoc(userRef, {
      displayName: name
    })
    } catch(e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  async updateUserEmail(email: string) {
    try {
      await updateEmail(auth.currentUser!, email)

      const userRef = doc(db, "users", auth.currentUser!.uid);

      await updateDoc(userRef, {
        email: email
      })} catch(e) {
        throw new Error("An unexpected error ocurred... ")
      }
  }

  async updatePhoto(src: string) {
    try {
      await updateProfile(auth.currentUser!, {
        photoURL: src
      })
  
      const userRef = doc(db, "users", auth.currentUser!.uid);
  
      await updateDoc(userRef, {
        photoURL: src
      })
      } catch(e) {
        throw new Error("An unexpected error ocurred... ")
      }
  }

  async updatePassword(password: Password) {
    if(password.new != password.confirm) {
      throw new Error("Does not match")
    }

    const user = auth.currentUser
    if(user){
    if (user.email) {
      signInWithEmailAndPassword(auth, user.email, password.old)
        .catch((e) => {
          if(e.code = "auth/wrong-password") {
            throw new Error("The password is wrong! ")
          } else {
            throw new Error("An unexpected error ocurred... ")
          }
        })

      updatePassword(user, password.new)
    }} else {
      throw new Error("You are not authenticated to change your password! ")
    }
  }

  logout() {
    try {
    signOut(auth)} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  makeid(length: number) {
    let result = '';
    try {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    } finally {
    return result;}
  }

  async addImage(file: File) {
    try {
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, 'profile/' + file.name);
    uploadBytesResumable(storageRef, file, metadata);
    return "profile/" + file.name} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }

  deleteImage(path: string) {
    try {
    const desertRef = ref(storage, path);
    deleteObject(desertRef)} catch (e) {
      throw new Error("An unexpected error ocurred... ")
    }
  }
}