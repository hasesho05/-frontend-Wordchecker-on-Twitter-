import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Box } from '@mui/system';
import Image from 'next/image';
import { Avatar, Button, Typography } from '@mui/material';
import ProfilePost from '../../components/common/ProfilePost';
import { useRecoilState, useRecoilValue } from 'recoil';
import { followingState } from '../../recoil/follow';
import { userStatusState } from '../../recoil/userstatus';
import { useEffect, useState } from 'react';
import apiAccess from '../../api/api';

type UserPageProps = {
  userData: UserData;
};

type UserPageParams = {
  userId: string;
};

type UserData = {
  id: number;
  username: string;
  email: string;
  user_icon: string;
  cover_image: string;
  twitter_link: string;
  profile: string;
};

const UserPage: NextPage<UserPageProps> = ({ userData }) => {
  const [following, setFollowing] = useRecoilState(followingState);
  const userStatus = useRecoilValue(userStatusState);
  const [posts, setPosts] = useState<any>([]);
  const router = useRouter();

  const getUserPosts = () => {
    const payload = {id: userData.id}
    const funcSuccess = (response: any) => {
      console.log(response.data.data);
      setPosts(response.data.data);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('GET_POST_BY_ID', funcSuccess, funcError, payload);
  }
  useEffect(() => {
    getUserPosts();
  }, []);

  const clickFollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: userData.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing([...following, userData.id])
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('FOLLOW', funcSuccess, funcError, payload);
  }

  const clickUnfollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: userData.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing(following.filter((id:number) => id !== userData.id));
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('UNFOLLOW', funcSuccess, funcError, payload);
  }


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
        <Box sx={{width:"100%", display:"flex", justifyContent:"center"}}>
          <Box sx={{overflow:"scroll", height:"100vh", mx:"auto", maxWidth:"600px"}}>
            <Box sx={{position:"relative", height:"400px"}}>
              <Image src={`http://localhost:8000${userData.cover_image}`} fill alt="cover_image" objectFit='cover' />
            </Box>
            <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100px", width:"100%", backgroundColor:"rgb(34,34,34)"}}>
            <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
              <Avatar src={`http://localhost:8000${userData.user_icon}`} sx={{width:"100px", height:"100px", border:"3px solid rgb(34,34,34)", transform:"translateY(-50px)"}}/>
            </Box>
          </Box>
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%", backgroundColor:"rgb(34,34,34)"}}>
            <Box sx={{px:5, display:"flex", flexDirection:"column", alignItems:"center"}}>
              <Typography sx={{color:"white", fontSize:"20px"}}>{userData?.username}</Typography>
              <Typography fontWeight="bold" sx={{color:"lightblue", fontSize:"15px"}}>{userData?.twitter_link}</Typography>
              <Typography sx={{color:"white", fontSize:"15px"}}>{userData?.profile}</Typography>
                <Box>
                  {following.includes(userData.id) ? 
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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<UserPageProps, UserPageParams> =
  async ({ params }) => {
    const { userId } = params as ParsedUrlQuery;
    try {
      const userData = await fetchUserData(userId);
      return {
        props: { userData },
      }
    } catch (error) {
      return { notFound: true };
    }
  };

const fetchUserData = async (userId: any): Promise<UserData> => {
  const response = await axios({
    method: 'post',
    url: "http://localhost:8000/api/accounts/get_userdata_by_user_id/",
    data: { user_id: userId },
    headers: { "content-type": 'application/json', }
  })
  const userData = response.data.data;
  return userData;
};

export default UserPage;
