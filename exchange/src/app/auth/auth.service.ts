import { Injectable } from '@angular/core';
import { auth, db } from '../../../firebaseconfig';
import { User } from '../user';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "firebase/auth";
import { query, where, collection } from 'firebase/firestore';
import { FireUser } from '../fire-user';

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

  updateDisplayName(name: string) {
    updateProfile(auth.currentUser!, {
      displayName: name
    })
  }

  logout() {
    signOut(auth)
  }
}