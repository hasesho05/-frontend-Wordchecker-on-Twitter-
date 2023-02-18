import { Box,TextField, Typography } from "@mui/material";
import { useState } from "react";
import { resizeFile } from "../../util/util";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiAccess from '../../api/api';
import { useCallback, useEffect} from 'react';
import BlackButton from '../../components/common/BlackButton';
import Layout from "../../components/Layout";
const theme = createTheme();

const add = () => {
  const [uploadedImages, setUploadedImages] = useState<any>({image:"", cover_image:""})
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
          ? <img src={URL.createObjectURL(image_path)} alt='preview' className={image_class} />
          : <img id={id + '_preview'} src='/gray.png' alt='preview' className={image_class} style={style}  />
        }
        <input id={id} type='file' name={name} onChange={handleChangeFile} style={{display:"none"}} />
      </label>
    );
  }

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");


  const inputUserName = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUsername(e.target.value)
  },[setUsername])

  const inputProfile = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile(e.target.value)
  },[setProfile])


  const handleSubmit = (e:any) => {
  }

  return (
    <Layout>
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
            backgroundColor: "inherit",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="h1" variant="h5" sx={{fontSize:"14px"}}>
              プロフィール画像
            </Typography>
            <Box sx={{display:"flex", w:"100%", justifyContent:"center"}}>
              {preview('id_image', 'profile-image', 'image', uploadedImages.image)}
            </Box>
            <Typography component="h1" variant="h5" sx={{fontSize:"14px"}}>
              カバー画像
            </Typography>
            {preview('id_cover_image', 'cover-image', 'cover_image', uploadedImages.cover_image)}

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
                fullWidth
                id="profile"
                label="Profile"
                name="profile"
                autoComplete="profile"
                rows={4}
                multiline
                onChange={(e)=>{inputProfile(e)}}
              />
              <BlackButton
                value="プロフィール編集"
                onClick={handleSubmit}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </Layout>
  );
}

export default add;