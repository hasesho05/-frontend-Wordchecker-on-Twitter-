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
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { auth, firestorage, storageRef } from '../config';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import BlackButton from '../components/common/BlackButton';
import { resizeFile } from '../util/util';
import { userStatusState } from '../recoil/userstatus';
import { useRecoilValue } from 'recoil';

const theme = createTheme();

export default function SignInSide() {
  const userStatus = useRecoilValue(userStatusState)
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedImages, setUploadedImages] = useState({
    image: null,
    cover_image: null,
  });

  const inputUserName = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(e.target.value)
  },[setUsername])

  const inputProfile = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(e.target.value)
  },[setProfile])

  const handleSubmit = () => {
    const payload = {
      'token': localStorage['auth_token'],
      'username': username,
      'profile': profile,
      ...uploadedImages,
    }
    const funcSuccess = (response: any) => {
      console.log(response);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('PROFILE_UPDATE', funcSuccess, funcError, payload);
  }

  const handleChangeFile = async(e: any) => {
    const { name, files } = e.target;
    const image = await resizeFile(files![0]);
    setUploadedImages({ ...uploadedImages, [name]: image });
  };
  
  const preview = (
    id: string,
    image_class: string,
    name: string,
    image_path: Blob | null
  ) =>  {
    return (
      <label htmlFor={id}>
        {
          image_path
          ? <Avatar src={URL.createObjectURL(image_path)} alt='preview' sx={{width:"100px", height:"100px"}} />
          : <Avatar id={id + '_preview'} alt='preview' className={image_class} sx={{width:"100px", height:"100px"}}   />
        }
        <input id={id} type='file' name={name} onChange={handleChangeFile} style={{display:"none"}} />
      </label>
    );
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
            {preview('image', 'user-image', 'image', uploadedImages.image)}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                id="username"
                label="ユーザーネーム"
                value={username}
                autoFocus
                onChange={(e)=>{inputUserName(e)}}
              />
            <TextField
                margin="normal"
                fullWidth
                id="Profile"
                label="プロフィール"
                value={profile}
                rows={4}
                multiline
                onChange={(e)=>{inputProfile(e)}}
              />

              {message && <Typography sx={{fontSize:"14px", color:"darkred"}}>{message}</Typography>}
              <BlackButton
                value="プロフィールを編集する"
                onClick={handleSubmit}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}