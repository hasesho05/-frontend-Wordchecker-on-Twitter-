import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import FindWord from '../components/FindWord';
import GetUserInfo from '../components/GetUserInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInAction } from '../redux/users/actions';
import { getUserId } from '../redux/users/selector';



export default function Home() {
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


  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  const dispatch = useDispatch()
  const selector:any = useSelector((state) => (state))
  const users = getUserId(selector)
  
  return (
    <>
    {isHeaderShown && <Header />}
      <Box sx={{mx:"auto", width:"100%", maxWidth:"1000px", backgroundColor:"#f2f2f2", height:"100%"}}>
        <Box sx={{mt:"20px", padding: {xs: "20px", sm:"50px"}}}>
          <Button onClick={()=>dispatch(signInAction({uid:"0000", username:"あいうえお"}))}>登録</Button>
          <div>{users}</div>
          {mode === 0 && <FindWord/> }
          {mode === 1 && <GetUserInfo />}
        </Box>
      </Box>
    </>
  )
}
