import { Box, FormControl, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/users/operations";
import BlackButton from "./common/BlackButton";
import TextInput from "./common/TextInput";
import TwitterLoginButton from "./common/TwitterLoginButton";

interface SignUpModal {
  signUpModalopen: boolean;
  setSignUpModalopen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignUpModal = React.memo((props: SignUpModal) => {
  const dispatch = useDispatch();

  const {signUpModalopen, setSignUpModalopen} = props;
  const handleClose = () => setSignUpModalopen(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  return (
    <Box>
      <Modal
        open={signUpModalopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ユーザー登録
          </Typography>
          <FormControl>
            <TextInput label={"ユーザー名"} fullWidth={true} multiline={false} required={true} rows={1} value={username} type={"text"} onChange={inputUserName}/>
            <TextInput label={"メールアドレス"} fullWidth={true} multiline={false} required={true} rows={1} value={email} type={"email"} onChange={inputEmail}/>
            <TextInput label={"パスワード"} fullWidth={true} multiline={false} required={true} rows={1} value={password} type={"password"} onChange={inputPassword}/>
            <TextInput label={"パスワード(確認)"} fullWidth={true} multiline={false} required={true} rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}/>
            <BlackButton value={"送信"} onClick={()=> dispatch(signUp(username, email, password, confirmPassword))}/>
          </FormControl>
          <TwitterLoginButton />
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
})