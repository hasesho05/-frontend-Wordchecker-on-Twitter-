import { AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem, Button, Tooltip, Badge } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useCallback, useEffect, useState } from "react";
import GreenButton from "./common/GreenButton";
import { HistoryModal, SignInModal, SignUpModal } from "./Modal";
import HistoryIcon from '@mui/icons-material/History';
import { Container } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";
import apiAccess from "../api/api";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userStatusState } from "../status/userstatus";


export default function Header(props: any) {
  const router = useRouter()

  const [signInModalopen, setSignInModalopen] = useState(false)
  const [signUpModalopen, setSignUpModalopen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [image, setImage] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSignIn = () => {
    setSignInModalopen(true)
    handleClose();
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    handleClose();
  }


  const [userStatus, setUserStatus] = useRecoilState(userStatusState)

  const getAuth = useCallback((token: string) => {
    const payload = {
      token: token
    }
    const funcSuccess = (response: any) => {
      setUserStatus({
        isSignedIn: true,
        username: response.data.data.username,
        icon: response.data.data.user_icon,
      })
    }
    const funcError = (error: any) => {
      console.log(error)
    }
    apiAccess("AUTHORIZATION", funcSuccess, funcError, payload)
  },[])

  useEffect(() => {
    var token = localStorage.getItem('token')
    if (!token) return
    if (userStatus.isSignedIn) return
    getAuth(token)
  }, [])


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
      <Box sx={{minWidth:"300px"}}>
        <Box sx={{display:"flex", justifyContent:"end"}}>
        <Tooltip className="ml-auto" sx={{ marginRight: "1rem", color: "#979797", cursor: "pointer" }} title="Notification">
          <Badge color="secondary" >
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <Avatar src={props.request?.user.icon} sx={{width:"50px", height:"50px", ml:"10px", mr:"10px"}}/>
        </Box>
        <Link href="/">
          <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
        <MenuItem onClick={handleSignOut}>退会</MenuItem>

      </Box>
      </Menu>
    )
  }

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{backgroundColor:"inherit"}}>
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Image src="/images/logo/logo_light.png" alt="logo" width={170} height={40} style={{cursor:"pointer"}} onClick={()=>window.location.href="/"}/>
          {userStatus.isSignedIn ? 
          <Container sx={{display:"flex"}}>
            <IconButton
              size="small"
              sx={{ ml:1}}
              onClick={() => setHistoryModalOpen(true)}
            >
              <HistoryIcon sx={{fontSize:"30px", color:"white"}}/>
            </IconButton>
            <IconButton
              size="small"
              sx={{mr:1}}
              onClick={() => setHistoryModalOpen(true)}
            >
              <AddToPhotosIcon sx={{fontSize:"30px", color:"white"}}/>
            </IconButton>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml:"auto", mr:1, fontSize:"30px"}}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src={props.request?.user.icon} />
            </IconButton>

          </Container>
          :
            <Box sx={{display: "flex", ml:"auto"}}>
              <GreenButton value={"ログイン"} onClick={handleSignIn}/>
              <GreenButton value={"新規登録"} onClick={()=>router.push("/signup")}/>
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
      {historyModalOpen &&
        <HistoryModal 
          historyModalOpen={historyModalOpen}
          setHistoryModalOpen={setHistoryModalOpen}
        />
      }
      
    </Box>
  );
}

