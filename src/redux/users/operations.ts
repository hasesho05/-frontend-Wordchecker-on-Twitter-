import { auth, db } from "../../config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, serverTimestamp, doc} from "firebase/firestore";

interface Props {
  username: string
  email: string
  password: string
  confirmpassword: string
}

export const signUp:any = async (props: Props) => {
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
        }
      })
  }
}
