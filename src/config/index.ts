import { initializeApp } from 'firebase/app'
import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/analytics"
import "firebase/performance"
import "firebase/functions"
import { firebaseConfig } from "./config"
import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
} from 'firebase/auth'
import { TwitterAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const twitterProvider = new TwitterAuthProvider()

// ログイン検知
export const onAuthStateChanged = (callback:any) => {
  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo = user
      ? {
        uid: user.uid,
      }
      : null
    callback(userInfo)
  })
}
