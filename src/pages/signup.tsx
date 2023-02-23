import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiAccess from '../api/api';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import TwitterLoginButton from '../components/common/TwitterLoginButton';
import BlackButton from '../components/common/BlackButton';
import { useRecoilState } from 'recoil';
import { userStatusState } from '../recoil/userstatus';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(userStatusState)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [message, setMessage] = useState("");

  const inputUserName = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(e.target.value)
  },[setUsername])

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
  },[setEmail])

  const inputPassword = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value) 
  },[setPassword])

  interface UserInitialData {
    token: string;
    username: string;
    email: string;
    icon: string;
    password: string;
  }

  function handleSignup(userInitialData: UserInitialData){
    const payload = {
      username: username,
      email: userInitialData.email,
      password: userInitialData.password,
      user_icon: "",
    }
    const funcSuccess = (response: any) => {
      console.log("signup success");
      localStorage.setItem('token', response.data.data.token);
      setUserInfo({
        id: response.data.data.id,
        icon: "",
        username: username,
        isSignedIn: true,
      })
      router.push('/');
    }
    const funcError = (error: any) => {
      console.log("signup error: ", error);
      setMessage(error.response.data.message)
    }
    apiAccess('SIGNUP', funcSuccess, funcError, payload);
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      setMessage("入力されていない項目があります");
      return;
    }
    if (password.length < 6) {
      setMessage("パスワードは6文字以上で入力してください");
      return;
    }
    const userInitialData = {
      token: "",
      username: username,
      email: email,
      icon: imageURL,
      password: password,
    }

    handleSignup(userInitialData);
  }

  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              会員登録
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>{inputUserName(e)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{inputEmail(e)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{inputPassword(e)}}
              />
              {message && <Typography sx={{fontSize:"14px", color:"darkred"}}>{message}</Typography>}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="パスワードを記憶する"
              />
              <BlackButton
                value="会員登録"
                onClick={handleSubmit}
              />
              <TwitterLoginButton />
              <Grid container>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"アカウントをお持ちの方はこちら"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}