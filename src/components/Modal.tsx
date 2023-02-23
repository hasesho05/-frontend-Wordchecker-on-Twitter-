import { Avatar, Box, Button, Container, FormControl, Modal, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlackButton from "./common/BlackButton";
import TextInput from "./common/TextInput";
import TwitterLoginButton from "./common/TwitterLoginButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestorage, storageRef } from "../config"
import FlashMessage from "./common/FlashMessage";
import { getDownloadURL, listAll } from "firebase/storage";
import { ref } from "firebase/storage";
import apiAccess from "../api/api";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Cookies from 'js-cookie';
import { resizeFile } from "../util/util";
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { userStatusState } from "../recoil/userstatus";
import { PostState } from "../recoil/post";
import useSWR, { mutate } from 'swr';
import { useRouter } from "next/router";

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
  border: '1px solid #000',
  boxShadow: "1px 1px 1px 1px gray",
  p: 4,
};

export const SignUpModal = React.memo((props: SignUpModal) => {
  const {signUpModalopen, setSignUpModalopen} = props;
  const handleClose = () => setSignUpModalopen(false);

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
  const {signInModalopen, setSignInModalopen } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">("success");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const setUserStatus = useSetRecoilState(userStatusState);

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
      if (response.data.status === "success") {
        Cookies.set('token', response.data.token, { expires: 7, path: '/' });
        
        localStorage.setItem("token", response.data.token);
        setUserStatus({
          id: response.data.data.id,
          icon: response.data.data.user_icon,
          isLogin: true,
        })
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
    apiAccess('LOGIN', funcSuccess, funcError, payload);
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

        </Stack>
      </Box>
    </Modal>
    {open && <FlashMessage message={message} severity={severity} open={open} setOpen={setOpen}/>}
  </Box>
  )
})

interface HistoryModal {
  historyModalopen: boolean;
  setHistoryModalopen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style2 = {
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


export const HistoryModal = React.memo((props: any) => {
  const {historyModalopen, setHistoryModalOpen } = props;
  const [history, setHistory] = useState<any>([]);

  const handleClose = () =>  {
    setHistoryModalOpen(false);
  }

  const getHistory = () => {
    const payload = {
      token: localStorage.getItem("token"),
    }

    const funcSuccess = (response: any) => {
      if (response.data.status === "ok") {
        console.log("get history success");
        console.log(response.data.data);
        setHistory(response.data.data);
      }
    }
    const funcError = (error: any) => {
      console.log("get history error: ", error);
    }
    apiAccess('HISTORY_LIST', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    getHistory();
  }, [historyModalopen])

  return (
    <Box sx={{position:"absolute", height:"100vh", width:"100vw"}} onClick={handleClose}>
      <Box sx={style}>
        <Stack spacing={3}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          履歴
        </Typography>
        <Box sx={{height:"100%", width:"100%", overflow:"scroll"}}>
          {history.map((item: any) => {
            return (
              <Box sx={{border:"1px solid black", padding:"10px", margin:"10px"}}>
                <Typography>{item.title}</Typography>
                <Typography>{item.created_at}</Typography>
              </Box>
            )
          })}
        </Box>
        </Stack>
      </Box>
  </Box>
  )
})


interface AddModal {
  addModalopen: boolean;
  setAddModalopen: React.Dispatch<React.SetStateAction<boolean>>;
  request: any
}

export const AddModal = React.memo((props: AddModal) => {
  const { addModalopen, setAddModalopen} = props;
  const router = useRouter()
  const [uploadedImages, setUploadedImages] = useState<any>({});
  const [content, setContent] = useState<string>("");
  const usetStatus = useRecoilValue(userStatusState);
  const [newPosts, setNewPosts] = useRecoilState(PostState)

  const handleClose = () => setAddModalopen(false);

  const handleChangeFile = async(e: any) => {
    const { name, files } = e.target;
    const image = await resizeFile(files![0]);
    setUploadedImages({ ...uploadedImages, [name]: image });
  };

  function preview(
    id: string,
    image_class: string,
    name: string,
    image_path: Blob | null
  ) {
    let style = image_class == 'cover-image' ? {width: '100%', height: '100%'}: {};

    return (
      <label htmlFor={id}>
        {
          image_path
          ? <img src={URL.createObjectURL(image_path)} alt='preview' style={{width:"100%", maxHeight:"200px", objectFit:"contain"}} />
          : <img id={id + '_preview'} src='/noimage.png' alt='preview' style={{width:"100%", maxHeight:"200px", objectFit:"cover", border:"1px solid gray"}}  />
        }
        <input id={id} type='file' name={name} onChange={handleChangeFile} style={{display:"none"}} />
      </label>
    );
  }


  const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%)',
    width: {xs: 300, sm: 400, md: 500},
    height: 300
  };

  const handleSubmit = () => {
    const payload = {
      account_id: usetStatus.id,
      content: content,
      image: uploadedImages.image,
    }

    const funcSuccess = (response: any) => {
        setNewPosts([...newPosts, response.data.data])
        router.reload()
        handleClose();
    }
    const funcError = (error: any) => {
      console.log("post error: ", error);
  }
  apiAccess('ADD_POST', funcSuccess, funcError, payload);
}

  return (
    <Box>
    <Modal
      open={addModalopen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={[style, {backgroundColor:"inherit"}]}>
        <Box sx={{display:"flex"}}>
          <Box sx={{backdropFilter:"blur(1px)", mr:"10px"}}>
            <Avatar src={usetStatus.icon} sx={{borderRadius:"20%"}}/>
          </Box>
          <Box sx={{backgroundColor:"rgb(34,34,34)", width:"100%", height:"100%"}}>
          {preview('id_image', 'profile-image', 'image', uploadedImages.image)}
          <GrammarlyEditorPlugin clientId="client_AfLKqKA2kXNRSLTC4rjW2a">
            <TextField 
              label="What's happening?"
              autoFocus
              rows={5}
              type="text"
              multiline
              fullWidth
              sx={{borderBottom:"1px solid gray", color:"white"}}
              InputProps={{style: { color: '#fff'}}}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              onChange={(e) => setContent(e.target.value)}
            />
          </GrammarlyEditorPlugin>
            <Box sx={{p:2, display:"flex", justifyContent:"space-between"}}>
              <Button onClick={handleClose} sx={{border:"1px solid gray", borderRadius:"20px", color:"white", fontWeight:"bold"}}>閉じる</Button>
              <Button onClick={handleSubmit} sx={{border:"1px solid gray", borderRadius:"20px", color:"white", fontWeight:"bold"}}>投稿</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  </Box>
  )
})