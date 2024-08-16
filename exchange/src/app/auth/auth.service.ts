import { Injectable } from '@angular/core';
import { auth, storage } from '../../../firebaseconfig';
import { User } from '../user';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, RecaptchaVerifier, signInWithPhoneNumber, updateProfile, updateEmail, reauthenticateWithCredential, AuthCredential, updatePassword } from "firebase/auth";
import { ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import { FireUser } from '../fire-user';
import { Password } from '../password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  ) { }

  async emailSignup(user: User) {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
  }

  async emailSignin(user: User) {
    await signInWithEmailAndPassword(auth, user.email, user.password)
  }

  getUser() {
    return auth.currentUser
  }

  async updateDisplayName(name: string) {
    await updateProfile(auth.currentUser!, {
      displayName: name
    })
  }

  async updateUserEmail(email: string) {
    await updateEmail(auth.currentUser!, email)
  }

  async updatePhoto(src: string) {
    await updateProfile(auth.currentUser!, {
      photoURL: src
    })
  }

  async updatePassword(password: Password) {
    if(password.new != password.confirm) {
      throw new Error("Does not match")
    }

    const user = auth.currentUser
    if (user) {
      //reauthenticateWithCredential(user)

      updatePassword(user, password.new)
    }


  }

  logout() {
    signOut(auth)
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

  async addImage(file: File) {
    const metadata = {
      contentType: 'image/jpeg'
    };
    const storageRef = ref(storage, 'profile/' + file.name);
    uploadBytesResumable(storageRef, file, metadata);
    return "profile/" + file.name
      //copy rest of the code to the ts file https://firebase.google.com/docs/storage/web/upload-files
  }

  deleteImage(path: string) {
    const desertRef = ref(storage, path);
    deleteObject(desertRef)
  }
}