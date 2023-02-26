import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import FindWord from '../components/FindWord';
import Layout from '../components/Layout';
import Link from 'next/link';
import { RecoilRoot, useRecoilValue } from 'recoil';
import NewPostBox from '../components/NewPostBox';
import { ExampleModal } from '../components/SlideProfile';
import apiAccess from '../api/api';
import { userStatusState } from '../recoil/userstatus';
import UserList from '../components/UserList';
import PopularPostBox from '../components/PopularPostBox';


interface Props {
  props: {
    data: {
      id: number;
      username: string;
      user_icon: string;
      cover_image: string;
      profile: string;
    }[]
}}

const Home = React.memo((props:Props) => {
  const users = props.props.data;
  const userStatus = useRecoilValue(userStatusState)
  
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [mode, setMode] = useState<number>(0)
  const [id, setId] = useState<number>(0)
  const matches = useMediaQuery('(min-width:800px)');
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

  const [following, setFollowing] = useState<any[]>([]);
  const [follower, setFollower] = useState<any[]>([]);

  const getFollowing = async () => {
    const payload = {
      account_id: userStatus.id,
    }
    const funcSuccess = (response: any) => {
      setFollowing(response.data.data);
      console.log(response.data.data);

    }
    const funcError = (error: any) => {
      console.log(error);
    }
    await apiAccess('GET_FOLLOW_INFO', funcSuccess, funcError, payload);
  }

  useEffect(()=> {
    getFollowing();
  },[])
  
  return (
    <RecoilRoot>
      <Layout >
        <Box sx={{mx:"auto", width:"100%", maxWidth:"1000px", height:"100%"}}>
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
          <Box sx={{padding: {xs: "20px", sm:"20px", display:"flex", gap:"20px"}}}>
            {mode === 0 && <NewPostBox open={open} setOpen={setOpen} setId={setId}/> }
            {mode === 1 && <PopularPostBox open={open} setOpen={setOpen} setId={setId}/>}
            {mode === 2 && <FindWord /> }
            {matches &&
            <Box sx={{width:"320px", maxHeight:"500px",background:"rgb(0, 40, 70)", overflow:"scroll", '& ::-webkit-scrollbar': {display: "none"}, position:"absolute", transform:"translateX(550px)"}}>
              <Box  className="recommend"  sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"70px", borderBottom:"1px solid  rgba(200,200,200,0.3)", position:"sticky", top:"0", zIndex:"10"}}>
                <Typography fontSize="20px" sx={{color:"white", fontWeight:"bold", mr:"auto", ml:"20px"}}>おすすめユーザー</Typography>
              </Box> 
              <Box>
                {users.map((user) => (
                  <UserList user={user} />
                ))}
              </Box>
            </Box>
            }
          </Box>
          {open && <ExampleModal id={id} open={open} onClose={()=>setOpen(false)} following={following}/>}
        </Box>

      </Layout>
    </RecoilRoot>
  )
})

export default Home;

export const getServerSideProps = async (context: any) => {
  const res = await fetch("http://localhost:8000/api/accounts/");
  const props = await res.json();
  return {
    props: {
      props,
    },
  };
}
