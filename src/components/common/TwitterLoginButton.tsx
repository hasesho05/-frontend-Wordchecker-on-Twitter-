import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { auth, twitterProvider } from '../../config';
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInAction } from '../../redux/users/actions';
import apiAccess from '../../api/api';
import React from 'react';

interface Props {
  handleClose: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeverity: React.Dispatch<React.SetStateAction<"error" | "success" | "info" | "warning">>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TwitterLoginButton = React.memo((props: Props) => { 
  const {handleClose, setMessage, setSeverity, setOpen} = props;
  const dispatch = useDispatch();
  const TwitterLogin = () => {
    signInWithPopup(auth, twitterProvider).then( async (result) => {
      const user = result.user
      dispatch(signInAction({uid:user.uid, username:user.displayName, icon:user.photoURL}))
      setMessage("ログインしました");
      setSeverity("success");
      setOpen(true);
    }).catch((error) => {
      console.log(error);
      setMessage("ログインに失敗しました");
      setSeverity("error");
      setOpen(true);
    }).finally(() => {
      handleClose();
    })
  }  

  function handleSignup(userInitialData: any){
    const payload = {
      'userdata': userInitialData,
    }
    const funcSuccess = (response: any) => {
      console.log("signup success");
    }
    const funcError = (error: any) => {
      console.log("signup error");
    }
    apiAccess('SIGNUP', funcSuccess, funcError, payload);
  }
  return (
  <>
    <Button color="primary" variant="contained" startIcon={<TwitterIcon />}  onClick={TwitterLogin} >
      Twitterで認証
    </Button>
  </>
  );
})

export default TwitterLoginButton;