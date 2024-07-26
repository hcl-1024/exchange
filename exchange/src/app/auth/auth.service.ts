import { Injectable } from '@angular/core';
import { auth } from '../../../../firebaseconfig';
import { User } from '../user';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, FacebookAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private googleProvider: GoogleAuthProvider, 
    private facebookProvider: FacebookAuthProvider // set this up https://developers.facebook.com/
  ) { }

  emailSignup(user: User) {
    createUserWithEmailAndPassword(auth, user.email, user.password)
  }

  emailSignin(user: User) {
    signInWithEmailAndPassword(auth, user.email, user.password)
  }

  getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        return user.uid;
      } else {
        return "no user"
      }
    })
  }

  google() {
    signInWithPopup(auth, this.googleProvider)
    // more stuff we can handle in ts https://firebase.google.com/docs/auth/web/google-signin
  }

  facebook() {
    signInWithPopup(auth, this.facebookProvider)
    // more stuff we can handle in ts https://firebase.google.com/docs/auth/web/facebook-login#web_2
  }

    // try phone number https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=1

  logout() {
    signOut(auth)
  }
}