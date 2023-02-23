import React, { useEffect, useState } from 'react';
import { Modal, Backdrop, Fade, Slide, Avatar, Typography, Button} from '@mui/material';
import { Box } from '@mui/system';
import { TransitionProps } from '@mui/material/transitions';
import apiAccess from '../api/api';
import Image from 'next/image';
import ProfilePost from './common/ProfilePost';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userStatusState } from '../recoil/userstatus';
import { followingState } from '../recoil/follow';

type Props = {
  open: boolean;
  onClose: () => void;
  id: number
  following: any
};

export const ExampleModal: React.FC<Props> = ({ open, onClose, id, following }) => {
  const [posts, setPosts] = useState<any>([]);
  const [account, setAccount] = useState<any>({});
  const userStatus = useRecoilValue(userStatusState);
  const setFollowing = useSetRecoilState(followingState);

  const clickFollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: account.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing([...following, account.id])
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('FOLLOW', funcSuccess, funcError, payload);
  }

  const clickUnfollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: account.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing(following.filter((id:number) => id !== account.id));
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('UNFOLLOW', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    const payload = {id: id}
    const funcSuccess = (response: any) => {
      console.log(response.data.data);
      
      setPosts(response.data.data);
      setAccount(response.data.data[0].account);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('GET_POST_BY_ID', funcSuccess, funcError, payload);
  }, [id]);
  
  const style = {
    position: 'relative as relative',
    mx:"auto",
    top: '8%',
    left: {xs:"0%", sm:"30%"},
    height: "100%",
    transform: 'translate(-50%, -50%)',
    width: {xs:"100%", sm:"600px"},
    bgcolor: 'rgb(34,34,34)',
    border: '2px solid #000',
    boxShadow: 24,
    overflow:"scroll",
  }

  const SlideTransition = React.forwardRef<unknown, TransitionProps>(function Transition(
    props: TransitionProps,
    ref: React.Ref<unknown>
  ) {
    return <Slide  direction="up" ref={ref} {...props} children={React.cloneElement(props.children as React.ReactElement, {
      style: {
        transitionDelay: props.in ? '30ms' : '0ms',
      },
    })}/>;
  });

  return (
    <Box sx={{display:"flex"}}>
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <SlideTransition in={open} timeout={300}>
      <Fade in={open} >
        <Box sx={style}>
          <Box sx={{overflow:"scroll", height:"100vh"}}>
            <Box sx={{position:"relative", height:"400px"}}>
              <Image src={account?.cover_image} fill alt="cover_image" />
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100px", width:"100%", backgroundColor:"rgb(34,34,34)"}}>
            <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
              <Avatar src={account?.user_icon} sx={{width:"100px", height:"100px", border:"3px solid rgb(34,34,34)", transform:"translateY(-50px)"}}/>
            </Box>
          </Box>
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", backgroundColor:"rgb(34,34,34)"}}>
            <Box sx={{px:5, display:"flex", flexDirection:"column", alignItems:"center"}}>
              <Typography sx={{color:"white", fontSize:"20px"}}>{account?.username}</Typography>
              <Typography fontWeight="bold" sx={{color:"lightblue", fontSize:"15px"}}>{account?.twitter_link}</Typography>
              <Typography sx={{color:"white", fontSize:"15px"}}>{account?.profile}</Typography>
                <Box>
                  {following.includes(account.id) ? 
                    <Button onClick={clickFollow} sx={{mt:"10px", color:"white", backgroundColor:"rgb(34,34,34)", border:"1px solid white"}}>フォロー</Button>
                  :
                    <Button onClick={clickUnfollow} sx={{mt:"10px", color:"white", backgroundColor:"rgb(34,34,34)", border:"1px solid white"}}>フォロー中</Button>
                  }
                </Box>
            </Box>
          </Box>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Box sx={{mt:"20px", display:"flex", width:"100%", borderBottom:"1px solid gray"}}>
              <Typography sx={{ml:"20px", color:"white", fontSize:"30px", fontWeight:"bold"}}>投稿</Typography>
            </Box>

            {posts.map((post: any) => (
              <ProfilePost post={post} />
            ))}
          </Box>
        </Box>
        </Box>
      </Fade>
      </SlideTransition>
    </Modal>
    </Box>
  );
};


type ProfileModal = {
  open: boolean;
  onClose: () => void;
  user: any;
  following: any;
};

export const ProfileModal: React.FC<ProfileModal> = ({ open, onClose, user, following }) => {
  const [posts, setPosts] = useState<any>([]);
  const [account, setAccount] = useState<any>({});
  const userStatus = useRecoilValue(userStatusState);
  const setFollowing = useSetRecoilState(followingState);

  const clickFollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: account.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing([...following, account.id])
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('FOLLOW', funcSuccess, funcError, payload);
  }

  const clickUnfollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: account.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing(following.filter((id:number) => id !== account.id));
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('UNFOLLOW', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    const payload = {id: user.id}
    const funcSuccess = (response: any) => {
      console.log(response.data.data);
      
      setPosts(response.data.data);
      setAccount(response.data.data[0].account);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('GET_POST_BY_ID', funcSuccess, funcError, payload);
  }, [user]);
  
  const style = {
    position: 'relative as relative',
    mx:"auto",
    top: '8%',
    left: {xs:"0%", sm:"30%"},
    height: "100%",
    transform: 'translate(-50%, -50%)',
    width: {xs:"100%", sm:"600px"},
    bgcolor: 'rgb(34,34,34)',
    border: '2px solid #000',
    boxShadow: 24,
    overflow:"scroll",
  }

  const SlideTransition = React.forwardRef<unknown, TransitionProps>(function Transition(
    props: TransitionProps,
    ref: React.Ref<unknown>
  ) {
    return <Slide  direction="up" ref={ref} {...props} children={React.cloneElement(props.children as React.ReactElement, {
      style: {
        transitionDelay: props.in ? '30ms' : '0ms',
      },
    })}/>;
  });

  return (
    <Box sx={{display:"flex"}}>
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
    >
      <SlideTransition in={open} timeout={300}>
      <Fade in={open} >
        <Box sx={style}>
          <Box sx={{overflow:"scroll", height:"100vh"}}>
            <Box sx={{position:"relative", height:"400px"}}>
              <Image src={user.cover_image ? user.cover_image : "/noimage.png"} fill alt="cover_image" />
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100px", width:"100%", backgroundColor:"rgb(34,34,34)"}}>
            <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
              <Avatar src={user.user_icon} sx={{width:"100px", height:"100px", border:"3px solid rgb(34,34,34)", transform:"translateY(-50px)"}}/>
            </Box>
          </Box>
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", backgroundColor:"rgb(34,34,34)"}}>
            <Box sx={{px:5, display:"flex", flexDirection:"column", alignItems:"center"}}>
              <Typography sx={{color:"white", fontSize:"20px"}}>{user.username}</Typography>
              <Typography fontWeight="bold" sx={{color:"lightblue", fontSize:"15px"}}>{user.twitter_link}</Typography>
              <Typography sx={{color:"white", fontSize:"15px"}}>{user.profile}</Typography>
                <Box>
                  {following.includes(account.id) ? 
                    <Button onClick={clickFollow} sx={{mt:"10px", color:"white", backgroundColor:"rgb(34,34,34)", border:"1px solid white"}}>フォロー</Button>
                  :
                    <Button onClick={clickUnfollow} sx={{mt:"10px", color:"white", backgroundColor:"rgb(34,34,34)", border:"1px solid white"}}>フォロー中</Button>
                  }
                </Box>
            </Box>
          </Box>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Box sx={{mt:"20px", display:"flex", width:"100%", borderBottom:"1px solid gray"}}>
              <Typography sx={{ml:"20px", color:"white", fontSize:"30px", fontWeight:"bold"}}>投稿</Typography>
            </Box>

            {posts.map((post: any) => (
              <ProfilePost post={post} />
            ))}
          </Box>
        </Box>
        </Box>
      </Fade>
      </SlideTransition>
    </Modal>
    </Box>
  );
};
