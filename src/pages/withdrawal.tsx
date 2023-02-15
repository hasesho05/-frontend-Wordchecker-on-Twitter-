import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiAccess from '../api/api';
import { useCallback, useEffect, useState } from 'react';
import BlackButton from '../components/common/BlackButton';

const theme = createTheme();

export default function SignInSide() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const inputPassword = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPassword(e.target.value) 
  },[setPassword])

  const handleSubmit = () => {
    const payload = {
      password: password,
      token : localStorage.getItem('token')
    }
    const funcSuccess = ((response:any) => {
      setMessage(response.data.message)
    })
    const funcError = ((error:any) => {
      setMessage(error.response.data.message)
    })
    apiAccess('WITHDRAWAL', funcSuccess, funcError, payload);
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
              退会ページ
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography component="h2" sx={{mt:"50px", mb:"20px", fontWeight:"bold"}}>
                退会するには、ログインパスワードが必要になります。
                ログインパスワードを入力して「退会する」ボタンを押してください。
              </Typography>
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
              <BlackButton
                value="退会する"
                onClick={handleSubmit}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}