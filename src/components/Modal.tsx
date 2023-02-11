import { Box, Button, FormControl, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlackButton from "./common/BlackButton";
import TextInput from "./common/TextInput";
import TwitterLoginButton from "./common/TwitterLoginButton";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { auth, firestorage, storageRef } from "../config"
import FlashMessage from "./common/FlashMessage";
import { getDownloadURL, listAll } from "firebase/storage";
import { ref } from "firebase/storage";
import apiAccess from "../api/api";
import { signInAction } from "../redux/users/actions";

interface SignUpModal {
  signUpModalopen: boolean;
  setSignUpModalopen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const SignUpModal = React.memo((props: SignUpModal) => {
  const {signUpModalopen, setSignUpModalopen} = props;
  const handleClose = () => setSignUpModalopen(false);
  const dispatch = useDispatch();

  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">("success");
  const [message, setMessage] = useState<string>("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState("");


  const inputUserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  },[setUsername])

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  },[setEmail])

  const inputPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value) 
  },[setPassword])

  const inputConfirmPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  },[setConfirmPassword])



  const getRandomImage = () => {
    listAll(storageRef).then(function(res) {
    // ストレージ内の全ファイルからランダムで1つのpathを取得
    let N = Math.floor(Math.random()*res.items.length)
    setImagePath(res.items[N].fullPath)
  }).catch(function(error) {
    console.log(error);
  })}

  interface UserInitialData {
    token: string;
    username: string;
    email: string;
    icon: string;
    password: string;
  }

  function handleSignup(userInitialData: UserInitialData){
    const payload = {
      token: userInitialData.token,
      username: username,
      email: userInitialData.email,
      password: userInitialData.password,
      icon: userInitialData.icon,
    }
    const funcSuccess = (response: any) => {
      console.log("signup success");
    }
    const funcError = (error: any) => {
      console.log("signup error: ", error);
    }
    apiAccess('SIGNUP', funcSuccess, funcError, payload);
  }

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setMessage("パスワードが一致しません。");
      setSeverity("error");
      setOpen(true);
      return false;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        if(user) {
          const uid = user.uid
          const userInitialData = {
            token: uid,
            username: username,
            email: email,
            icon: "gs://wordchecker-a26d8.appspot.com/" + imagePath,
            password: password,
          }
          handleClose();
          handleSignup(userInitialData);
          localStorage.setItem("token", uid);
          setMessage("ユーザー登録が完了しました。");
          setSeverity("success");
          setOpen(true);
        }})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          setMessage("パスワードが弱すぎます。");
          setSeverity("error");
          setOpen(true);
        } else {
          setMessage(errorMessage);
          setSeverity("error");
          setOpen(true);
        }
      });
    }

  useEffect(() => {
    getRandomImage();
  }, [])
  
  const onClick = () => {
    const gsReference = ref(firestorage, "gs://wordchecker-a26d8.appspot.com/" + imagePath);
    getDownloadURL(gsReference)
    .then((url) => {
      console.log(url);
      setImage(url);
    })
    .catch((err) => console.log(err));
  }

  return (
    <Box>
      <Modal
        open={signUpModalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={onClick}>ボタン</Button>
          <img src={image}/>
          <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ユーザー登録
          </Typography>
          <FormControl>
            <TextInput label={"ユーザー名"} fullWidth={true} multiline={false} required={true} rows={1} value={username} type={"text"} onChange={inputUserName}/>
            <TextInput label={"メールアドレス"} fullWidth={true} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}/>
            <TextInput label={"パスワード"} fullWidth={true} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}/>
            <TextInput label={"パスワード(確認)"} fullWidth={true} multiline={false} required={true} rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}/>
            <BlackButton value={"メールアドレスで登録"} onClick={handleSubmit}/>
          </FormControl>
          <TwitterLoginButton handleClose={handleClose} setMessage={setMessage} setSeverity={setSeverity} setOpen={setOpen}/>
          </Stack>
        </Box>
      </Modal>
      {open && <FlashMessage message={message} severity={severity} open={open} setOpen={setOpen}/>}
    </Box>
  )
})

interface SingInModal {
  signInModalopen: boolean;
  setSignInModalopen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignInModal = React.memo((props: SingInModal) => {
  const dispatch = useDispatch();
  const {signInModalopen, setSignInModalopen } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">("success");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleClose = () => setSignInModalopen(false);

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  },[setEmail])

  const inputPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value) 
  },[setPassword])

  const handleSubmit = () => {
    const payload = {
      email: email,
      password: password,
    }

    const funcSuccess = (response: any) => {
      if (response.data.status === "ok") {
        console.log("signin success");
        localStorage.setItem("token", response.data.data.token);
        dispatch(signInAction({username: response.data.data.username, icon: response.data.data.icon}))
        setMessage("ログインしました。");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => {
          handleClose();
        }, 1000)
      }
    }
    const funcError = (error: any) => {
      console.log("signin error: ", error);
      setMessage("ログインに失敗しました。");
      setSeverity("error");
      setOpen(true);
    }
    apiAccess('SIGNIN', funcSuccess, funcError, payload);
  }

  return (
    <Box>
    <Modal
      open={signInModalopen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={3}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          ログイン
        </Typography>
        <FormControl>
          <TextInput label={"メールアドレス"} fullWidth={true} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}/>
          <TextInput label={"パスワード"} fullWidth={true} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}/>
          <BlackButton value={"メールアドレスでログイン"} onClick={handleSubmit}/>
        </FormControl>
        <TwitterLoginButton handleClose={handleClose} setMessage={setMessage} setSeverity={setSeverity} setOpen={setOpen}/>
        </Stack>
      </Box>
    </Modal>
    {open && <FlashMessage message={message} severity={severity} open={open} setOpen={setOpen}/>}
  </Box>
  )
})