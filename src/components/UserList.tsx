import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import apiAccess from "../api/api";
import { followingState } from "../recoil/follow";
import { userStatusState } from "../recoil/userstatus";
import { ProfileModal } from "./SlideProfile";

interface Props {
  user: {
    id: number;
    username: string;
    user_icon: string;
  }
}

const UserList = (props:Props) => {
  const { user } = props;
  const [open, setOpen] = useState(false);
  const userStatus = useRecoilValue(userStatusState)
  const [following, setFollowing] = useRecoilState(followingState);

  const clickFollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: user.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing([...following, user.id])
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('FOLLOW', funcSuccess, funcError, payload);
  }

  const clickUnfollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: user.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing(following.filter((id:number) => id !== user.id));
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('UNFOLLOW', funcSuccess, funcError, payload);
  }

  return (
    <Box className="userlist" key={user.id} sx={{display:"flex", alignItems:"center", borderBottom:"1px solid  rgba(200,200,200,0.3)", height:"70px", cursor:"pointer",  justifyContent:"space-between"}}>
      <Box onClick={()=>{setOpen(true)}} sx={{display:"flex",width:"100%", zIndex:"-1"}}>
        <Avatar src={user.user_icon} alt="profile" style={{width:"40px", height:"40px", borderRadius:"20%", objectFit:"cover", marginLeft:"20px"}}/>
        <Typography fontSize="14px" sx={{my:"auto" ,color:"white", fontWeight:"bold", ml:"20px"}}>{user.username}</Typography>
      </Box>
      {!following.includes(user.id) ?
        <Typography onClick={clickFollow} fontSize="14px" sx={{ml:"20px",my:"auto", color:"#00B8FF", fontWeight:"bold", cursor:"pointer", whiteSpace:"nowrap", mr:"10px"}}>フォロー</Typography>
      :
        <Typography onClick={clickUnfollow} fontSize="14px" sx={{ml:"20px",my:"auto", color:"#00B8FF", fontWeight:"bold", cursor:"pointer", whiteSpace:"nowrap", mr:"10px"}}>フォロー中</Typography>
      }
      {open && <ProfileModal user={user} open={open} onClose={()=>setOpen(false)} following={following}/>}
    </Box>
  );
}

export default UserList;