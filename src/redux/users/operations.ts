import { auth, db } from "../../config"
import { signInAction } from "./actions"
import { createUserWithEmailAndPassword } from "firebase/auth";
import {collection, setDoc, serverTimestamp, doc} from "firebase/firestore";
import { AnyAction } from "@reduxjs/toolkit";

export const signIn = () => {
  return async (dispatch: any, getState: any) => {
    const state = getState()
    const isSignedIn = state.users.isSignedIn
    if (!isSignedIn) {
      const url = 'https://api.github.com/users/hasesho0005'
      const response = await fetch(url)
        .then(res => res.json())
        .catch(() => null)
      const username = response.login
      dispatch(
        signInAction({
          isSignedIn: true,
          uid: '0001',
          username: username,
        })
      )
    }
  }
}

interface Props {
  username: string
  email: string
  password: string
  confirmpassword: string
}

export const signUp:any = async (props: any) => {
  const { username, email, password, confirmpassword } = props;
  return async (dispatch: any) => {
    if(username === "" || email === "" || password === "" || confirmpassword === "") {
      alert("必須項目が未入力です")
      return false
    }
    if(password === confirmpassword) {
      alert("パスワードが一致しません")
      return false
    }
    
    return createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        if(user) {
          const uid = user.uid
          const timestamp = serverTimestamp()
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
          }

          setDoc(doc(db, "users", uid), userInitialData)
        }
      })
  }
}
