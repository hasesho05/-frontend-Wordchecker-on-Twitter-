import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useState } from 'react'
import FindWord from '../components/FindWord';
import GetUserInfo from '../components/GetUserInfo';
import apiAccess from '../api/api';

import Layout from '../components/Layout';
import Link from 'next/link';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import NewPostBox from '../components/NewPostBox';
import Loading from '../components/common/Loading/Loading';
import { profileOpenState } from '../status/profile';
import SlowModal from '../components/SlideProfile';
import ExampleModal from '../components/SlideProfile';




export default function Home(props: any) {
  const { request } = props;
  
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [mode, setMode] = useState<number>(0)
  const [id, setId] = useState<number>(0)
  const headerHeight = 40;

  const [open, setOpen] = useState(false);

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

  const tabStyle = {
    color:"white", 
    fontWeight:"bold", 
    borderBottom:"2px solid white",
    borderRadius:"0px",
    "&:hover": {background: "rgba(255,255,255,0.2)"},
  }

  const activeTabStyle = {
    color:"#00B8FF",
    fontWeight:"bold",
    borderBottom:"2px solid #00B8FF",
    "&:hover": {background: "rgba(255,255,255,0.2)"},
  }
  
  return (
    <RecoilRoot>
      <Layout >
        <Box sx={{mx:"auto", width:"100%", maxWidth:"800px", height:"100%"}}>
          <Box sx={{maxWidth:"1000px", display:"flex", p:"20px", width:"100%"}}>
            <Link href="/">
              <Button onClick={()=>setMode(0)} sx={[tabStyle, mode === 0 && activeTabStyle]}>新着⌛</Button>
            </Link>
            <Link href="/">
              <Button onClick={()=>setMode(1)} sx={[tabStyle, mode === 1 && activeTabStyle]}>人気💡</Button>
            </Link>
            <Link href="/">
              <Button onClick={()=>setMode(2)} sx={[tabStyle, mode === 2 && activeTabStyle]}>検索🔍</Button>
            </Link>
          </Box>
          <Box sx={{mt:"150px",padding: {xs: "20px", sm:"20px"}}}>
            {mode === 0 && <NewPostBox open={open} setOpen={setOpen} setId={setId}/> }
            {mode === 1 && <Loading />}
            {mode === 2 && <FindWord/> }
          </Box>
        </Box>
        {open && <ExampleModal id={id} open={open} onClose={()=>setOpen(false)}/>}
      </Layout>
    </RecoilRoot>
  )
}
