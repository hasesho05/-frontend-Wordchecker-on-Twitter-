import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import FindWord from '../components/FindWord';
import GetUserInfo from '../components/GetUserInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInAction } from '../redux/users/actions';
import { getSignedIn, getUser } from '../redux/users/selector';
import apiAccess from '../api/api';
import { useRouter } from 'next/router';
import FlashMessage from '../components/common/FlashMessage';
import { createMessage } from '../redux/message/selector';



export default function Home() {
  const dispatch = useDispatch()
  const selector:any = useSelector((state) => (state))
  const isSignedIn = getSignedIn(selector)
  const selector2:any = useSelector((state) => (state))
  const open = createMessage(selector2)
  

  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [mode, setMode] = useState<number>(0)
  const headerHeight = 40;

  const scrollEvent = useCallback(() => {
    const position = window.pageYOffset;
    const isHeaderShown = position < currentPosition || position < headerHeight;
    setIsHeaderShown(isHeaderShown);
    setCurrentPosition(position);
  }, []);


  const getUserInfo = useCallback((token: string) => {
    const payload = {
      token: token
    }
    const funcSuccess = (response: any) => {
      dispatch(signInAction({username: response.data.data.username, icon: response.data.data.icon}))
    }
    const funcError = (error: any) => {
      console.log(error)
      localStorage.removeItem('token')
    }
    apiAccess("AUTHORIZATION", funcSuccess, funcError, payload)
  },[])

  useEffect(() => {
    if (isSignedIn) return
    var token = localStorage.getItem('token')
    if (!token) return
    getUserInfo(token)
  }, [])
  

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  const users = getUser(selector)
  
  return (
    <>
      <Box sx={{backgroundSize:"contain", backgroundPosition:"center",backgroundAttachment:"fixed" ,background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/system/bg.jpg')", padding: "0", height:"50vh" }}>
        <Header />
        </Box>
      {users}
      <Box sx={{mx:"auto", width:"100%", maxWidth:"1000px", backgroundColor:"#f2f2f2", height:"100%"}}>
        <Box sx={{mt:"20px", padding: {xs: "20px", sm:"50px"}}}>
          {mode === 0 && <FindWord/> }
          {mode === 1 && <GetUserInfo />}
        </Box>
      </Box>
      {open && <FlashMessage message={message} severity={severity} open={open} setOpen={setOpen}/>}
    </>
  )
}
