import { Injectable } from '@angular/core';
import { auth } from '../../../firebaseconfig';
import { User } from '../user';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  ) { }

  emailSignup(user: User) {
    createUserWithEmailAndPassword(auth, user.email, user.password)
  }

  emailSignin(user: User) {
    signInWithEmailAndPassword(auth, user.email, user.password)
  }

  getUser() {
    onAuthStateChanged(auth, (user:any) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        return user.uid;
      } else {
        return "no user"
      }
    })
  }

    // try phone number https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=1

  logout() {
    signOut(auth)
  }
}