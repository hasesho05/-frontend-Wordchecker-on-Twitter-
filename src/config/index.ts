import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import "firebase/analytics"
import "firebase/performance"
import "firebase/functions"
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from "./config"
import {
  getAuth,
  onAuthStateChanged as onFirebaseAuthStateChanged,
} from 'firebase/auth'
import { TwitterAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage, ref, listAll } from 'firebase/storage'

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
export const firestorage = getStorage(app);


export const storage = getStorage()
export const storageRef = ref(storage);
// Firestoreからランダムで画像を取得