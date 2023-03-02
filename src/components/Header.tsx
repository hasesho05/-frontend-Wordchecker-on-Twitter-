import { AppBar, Toolbar, IconButton, Box, Avatar, Menu, MenuItem, Tooltip, Badge, useMediaQuery, Typography } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import React, { useEffect, useState } from "react";
import GreenButton from "./common/GreenButton";
import { AddModal, HistoryModal, SignInModal, SignUpModal } from "./Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userStatusState } from "../recoil/userstatus";
import SearchField from "./SearchField";
import apiAccess from "../api/api";


export const Header = React.memo((props: any) => {
  const router = useRouter()
  const { q } = router.query;
  const [userStatus, setUserStatus] = useRecoilState(userStatusState)
  const [signInModalopen, setSignInModalopen] = useState(false)
  const [signUpModalopen, setSignUpModalopen] = useState(false)
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const matches: boolean = useMediaQuery("(min-width:577px)");
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

  const [hydrated, setHydrated] = useState(true)
  useEffect(() => {
    setHydrated(true)
  },[])

  const [notifications, setNotifications] = useState<any>([])

  const getNotifications = () => {
    const payload = {
      "account_id": userStatus.id,
    }
    const funcSuccess = (res: any) => {
      setNotifications(res.data.data)
    }
    const funcError = (err: any) => {
      console.log(err)
    }
    apiAccess('GET_NOTIFICATION', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    getNotifications()
  }, [anchorEl])

  const [unreads_notifications, setUnreads_notifications] = useState<any>([])
  
  useEffect(() => {
    setUnreads_notifications(notifications.filter((item: any) => item.is_read === false).map((item: any) => item.id))
  }, [notifications])

  const ProfileMenu = () => {
    const [notiAnchorEl, setNotiAnchorEl] = useState<null | HTMLElement>(null);
    const notiOpen = Boolean(notiAnchorEl);

    const handleNotiOpen = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setNotiAnchorEl(event.currentTarget);
    }

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
      <Box sx={{minWidth:"250px"}}>
        <Box sx={{display:"flex", justifyContent:"end"}}>
        <Tooltip className="ml-auto" sx={{mt:1, mr: "1rem", color: "#979797", cursor: "pointer" }} title="Notification" onClick={(e)=>handleNotiOpen(e)}>
          <Badge color="secondary"  badgeContent={unreads_notifications.length}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", mb:"50px"}}>
          <Avatar src={userStatus.icon} sx={{width:"50px", height:"50px", ml:"10px", mr:"10px"}}/>
        </Box>
        <Link href={`/user/${userStatus.userId}`}>
          <MenuItem >マイページ</MenuItem>
        </Link>
        <Link href="/user/edit">
          <MenuItem >プロフィール編集</MenuItem>
        </Link>
          <MenuItem onClick={handleSignOut}>ログアウト</MenuItem>
        <Link href="/user/withdrawal">
          <MenuItem>退会</MenuItem>
        </Link>

      </Box>
        <NotificationMenu notifications={notifications} NotiAnchorEl={notiAnchorEl} notiOpen={notiOpen} handleNotificationClose={()=>setAnchorEl(null)}/>
      </Menu>
    )
  }

  return (
    <>
      {hydrated &&
        <Box flexGrow={1}>
          <AppBar position="static" sx={{backgroundColor:"inherit", borderBottom:"1px solid rgba(200,200,200,0.3)"}}>
            <Toolbar sx={{display:"flex"}}>
              {matches && <Image src="/LangLink.png" alt="logo" width={100} height={40} style={{cursor:"pointer"}} onClick={()=>window.location.href="/"}/>}
              <>
              
              {userStatus?.isLogin ? 
              <Box sx={{display:"flex", width:"100%"}}>
                <Box sx={matches? {ml:"auto"}: {mr:"auto"}}>
                  <SearchField query={q}/>
                </Box>
                <Box display="flex">
                  <IconButton
                    size="small"
                    sx={{mr:0.2}}
                    onClick={() => setAddModalOpen(true)}
                  >
                    <AddToPhotosIcon sx={{fontSize:"30px", color:"white"}}/>
                  </IconButton>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml:"auto", fontSize:"30px"}}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar src={userStatus.icon} />
                  </IconButton>
                </Box>
              </Box>
              :
                <Box sx={{display: "flex", ml:"auto", whiteSpace:"nowrap"}}>
                  <SearchField query={q}/>
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
      }
    </>
  );
})

const NotificationMenu = (props:any) => {
  const {notifications, NotiAnchorEl, handleNotificationClose, notiOpen} = props;
  console.log(notifications);

  const style = {
    borderBottom:"1px solid lightgray",
    height:"50px", 
    display:"flex",
    color:"black",
  }
  
  return (
    <Menu
      id="basic-menu"
      anchorEl={NotiAnchorEl}
      open={notiOpen}
      onClose={handleNotificationClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <Box sx={{minWidth:"250px", minHeight:"500px"}}>
        {notifications.map((notification:any) => (
          <Box key={notification.id}>
            {notification.types === "follow" &&
              <Box sx={style}>
                <Avatar src={notification.account.user_icon} sx={{width:"30px", height:"30px", ml:"10px", mr:"10px"}}/>
                <Typography fontSize={1} sx={{mx:"auto"}}>{notification.account.username}さんがあなたをフォローしました</Typography>
              </Box>
            }

            {notification.types === "like" &&
              <Box sx={style}>

              </Box>
            }

            {notification.types === "comment" &&
              <Box sx={style}>

              </Box>
            }
          </Box>
        ))}

      </Box>
      </Menu>
    )
  }
