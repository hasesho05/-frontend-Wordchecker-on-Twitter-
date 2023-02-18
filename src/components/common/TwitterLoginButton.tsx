import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { auth, twitterProvider } from '../../config';
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import apiAccess from '../../api/api';
import React from 'react';


const TwitterLoginButton = React.memo(() => { 
  const TwitterLogin = () => {
    signInWithPopup(auth, twitterProvider).then( async (result) => {
      const user = result.user
      localStorage.setItem('token', user.uid)
      const userInitialData = {
        token: user.uid,
        username: user.displayName,
        email: user.email,
        icon: user.photoURL,
        password: "",
      }
      handleSignup(userInitialData)
    }).catch((error) => {
      console.log(error);
    })
  }  

  function handleSignup(userInitialData: any){
    const payload = {
      token: userInitialData.token,
      username: userInitialData.username,
      email: userInitialData.email,
      password: userInitialData.password,
      icon: userInitialData.icon,
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
    <Button color="primary" variant="contained" fullWidth startIcon={<TwitterIcon />}  onClick={TwitterLogin} >
      Twitterで認証
    </Button>
  );
})

export default TwitterLoginButton;