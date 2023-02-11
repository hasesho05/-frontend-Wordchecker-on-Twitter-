import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOutAction } from "../redux/users/actions";
import { getIcon, getSignedIn, getUser } from "../redux/users/selector";
import GreenButton from "./common/GreenButton";
import { SignInModal, SignUpModal } from "./Modal";
import HistoryIcon from '@mui/icons-material/History';
import { Container } from "semantic-ui-react";
import { getDownloadURL, ref } from "firebase/storage";
import { firestorage } from "../config";

export default function Header() {
  const dispatch = useDispatch()
  const [signInModalopen, setSignInModalopen] = useState(false)
  const [signUpModalopen, setSignUpModalopen] = useState(false)
  const [image, setImage] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignUp = () => {
    setSignUpModalopen(true)
    handleClose();
  }

  const handleSignIn = () => {
    setSignInModalopen(true)
    handleClose();
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    dispatch(signOutAction())
    handleClose();
  }

  const selector:any = useSelector((state) => (state))
  const isSignedIn = getSignedIn(selector)
  const icon = getIcon(selector)

  useEffect(() => {
    if (!icon) return
    const gsReference = ref(firestorage, icon);
    getDownloadURL(gsReference)
    .then((url) => {
      console.log(url);
      setImage(url);
    })
    .catch((err) => console.log(err));
  }, [icon])
  

  const ProfileMenu = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    )
  }

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{backgroundColor:"#598B2C"}}>
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography sx={{fontWeight:"bold", fontSize:20}}>WordChecker</Typography>
          {isSignedIn ? 
          <Container sx={{display:"flex"}}>
            <IconButton
              size="small"
              sx={{ ml:1, mr:1 }}
            >
              <HistoryIcon sx={{fontSize:"40px", color:"white"}}/>
            </IconButton>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml:"auto", mr:1, backgroundColor:"gray" }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src={image}/>
            </IconButton>

          </Container>
          :
            <Box sx={{display: "flex", ml:"auto"}}>
              <GreenButton value={"ログイン"} onClick={handleSignIn}/>
              <GreenButton value={"新規登録"} onClick={handleSignUp}/>
            </Box>
          }
        </Toolbar>
      </AppBar>
      <ProfileMenu />
      {signUpModalopen &&
        <SignUpModal 
          signUpModalopen={signUpModalopen}
          setSignUpModalopen={setSignUpModalopen}
        />}

      {signInModalopen &&
        <SignInModal
          signInModalopen={signInModalopen}
          setSignInModalopen={setSignInModalopen}
        />
      }
    </Box>
  );
}

