import { AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem, Button, Tooltip, Badge } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import React, { useCallback, useEffect, useState } from "react";
import GreenButton from "./common/GreenButton";
import { AddModal, HistoryModal, SignInModal, SignUpModal } from "./Modal";
import HistoryIcon from '@mui/icons-material/History';
import { Container } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";
import apiAccess from "../api/api";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Link from "next/link";
import { useRecoilState, useRecoilTransactionObserver_UNSTABLE, useRecoilValue } from "recoil";
import { userStatusState } from "../status/userstatus";


export const Header = React.memo((props: any) => {
  const router = useRouter()
  const [signInModalopen, setSignInModalopen] = useState(false)
  const [signUpModalopen, setSignUpModalopen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
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
    setUserStatus({
      isLogin: false,
      id:0,
      icon:"",
    })
    handleClose();
  }

  const [userStatus, setUserStatus] = useRecoilState(userStatusState)

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
        <Link href="/user/edit">
          <MenuItem >プロフィール編集</MenuItem>
        </Link>
          <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
        <Link href="/user/withdrawal">
          <MenuItem>退会</MenuItem>
        </Link>

      </Box>
      </Menu>
    )
  }

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{backgroundColor:"inherit"}}>
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Image src="/images/logo/logo_light.png" alt="logo" width={170} height={40} style={{cursor:"pointer"}} onClick={()=>window.location.href="/"}/>
          <>
          {userStatus?.isLogin ? 
          <Container sx={{display:"flex"}}>
            <IconButton
              size="small"
              sx={{mr:1}}
              onClick={() => setAddModalOpen(true)}
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
              <Avatar src={userStatus.icon} />
            </IconButton>

          </Container>
          
          :
            <Box sx={{display: "flex", ml:"auto"}}>
              <Button onClick={()=>console.log(userStatus)}>ボタン</Button>
              <GreenButton value={"ログイン"} onClick={handleSignIn}/>
              <GreenButton value={"新規登録"} onClick={()=>router.push("/signup")}/>
            </Box>
          }
          </>
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

      {addModalOpen &&
        <AddModal 
          addModalopen={addModalOpen}
          setAddModalopen={setAddModalOpen}
          request={props.request}
        />
      }
      
    </Box>
  );
})

