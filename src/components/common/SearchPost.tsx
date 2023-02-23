import { Avatar, Box, Button, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiAccess from "../../api/api";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import PostComment from "./PostComment";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userStatusState } from "../../recoil/userstatus";
import { followingState } from "../../recoil/follow";

interface Props {
  post: any;
  open?: boolean;
  setOpen?: any;
  setId?: any;
}

const SearchPost = (props:Props) => {
  const {post, setOpen, setId} = props;
  console.log("post: ",post);
  

  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState("")
  const matches = useMediaQuery('(min-width:600px)');
  const userStatus = useRecoilValue(userStatusState)
  const [following, setFollowing] = useRecoilState(followingState);
  const addLike = () => {
    const payload = {
      post_id: post.id,
      account_id: userStatus.id,
    }

    const funcSuccess = (response: any) => {
      setIsLiked(true);
      post.like.push(userStatus.id);
      console.log(response.data);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('ADD_LIKE', funcSuccess, funcError, payload);
  }

  const removeLike = () => {
    const payload = {
      account_id: userStatus.id,
      post_id: post.id,
    }
    const funcSuccess = (response: any) => {
      setIsLiked(false);
      post.like.pop(userStatus.id);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('REMOVE_LIKE', funcSuccess, funcError, payload);
  }

  const submitComment = () => {
    const payload = {
      account_id: userStatus.id,
      post_id: post.id,
      comment: comment,
    }
    const funcSuccess = (response: any) => {
      setComments([...comments, response.data.data]);
      setComment("");
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('ADD_COMMENT', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    if (post?.like?.includes(userStatus.id)) {
      setIsLiked(true);
    }
  }, [post])

  useEffect(() => {
    if (isCommentOpen) {
      const payload = {
        post_id: post.id,
      }
      const funcSuccess = (response: any) => {
        setComments(response.data.data);
      }
      const funcError = (error: any) => {
        console.log(error);
      }
      apiAccess('GET_COMMENTS', funcSuccess, funcError, payload);
    }
  }, [isCommentOpen])

  const clickFollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: post.account.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing([...following, post.account.id])
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('FOLLOW', funcSuccess, funcError, payload);
  }

  const clickUnfollow = () => {
    const payload = {
      account_id: userStatus.id,
      following_id: post.account.id,
    }
    const funcSuccess = (response: any) => {
      console.log(response.data);
      setFollowing(following.filter((id:number) => id !== post.account.id));
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('UNFOLLOW', funcSuccess, funcError, payload);
  }

  return (
    <Box display="flex">
      <Box sx={{mb:"20px", width:{xs:"100%", ms:"540px", md:"540px"}}}>
        <Box sx={{display:"flex"}}>
          <IconButton onClick={()=>{setOpen(true);setId(post.account.id)}}>
            <Avatar src={`http://localhost:8000${post.account.user_icon}`} sx={{width:"60px", height:"60px", mb:"auto", borderRadius:"10px"}}/>
          </IconButton>
          <Box sx={{display:"flex"}}>
            <Typography sx={{my:"auto"}}>{post.account.username}</Typography>
            {!following.includes(post.account.id) ? 
              <Typography onClick={clickFollow} sx={{ml:"20px",my:"auto", color:"#00B8FF", fontWeight:"bold", cursor:"pointer"}}>フォロー</Typography>
            :
            <Typography onClick={clickUnfollow} sx={{ml:"20px",my:"auto", color:"#00B8FF", fontWeight:"bold", cursor:"pointer"}}>フォロー中</Typography>
            }
            
          </Box>
        </Box>
          <Box>
            <Box sx={{position:"relative", minHeight:{xs:"280px", ms:"400px", md:"400px", lg:"400px", xl:"400px"}, width:"100%", borderRadius:"50px"}}>
              <Image src={`http://localhost:8000${post.image}`} alt={post.id} fill objectFit="cover" loading="eager" placeholder="blur" blurDataURL="blur.png"/>
            </Box>
            <Box>
            <Box sx={{m:"20px"}}>
              <Typography variant="h2" sx={{fontSize:"1.1rem", color:"white", lineHeight:"1.5rem"}}>
                {post.content}
              </Typography>
            </Box>
            <Container sx={{display:"flex", gap:1}}>
              <Box sx={{ml:"auto", display:"flex", gap:0.5}}>
                <ChatBubbleOutlineIcon sx={{width:"16px",cursor:"pointer"}} onClick={()=>setIsCommentOpen(!isCommentOpen)}/>
                <Typography sx={{fontSize:"14px", mt:"1px"}}>{post?.comment?.length}</Typography>
              </Box>
              <Box sx={{display:"flex", gap:0.5}}>
                <FavoriteIcon onClick={!isLiked ? addLike : removeLike} sx={isLiked ? {width:"16px",cursor:"pointer" ,color:"red"} : {width:"16px",cursor:"pointer"}}/>
                <Typography sx={{fontSize:"14px", mt:"1px"}}>{post?.like?.length}</Typography>
              </Box>
              <Box sx={{display:"flex", gap:0.5}}>
                <IosShareIcon sx={{width:"16px"}}/>
              </Box>
            </Container>
          </Box>
          </Box>
          {isCommentOpen && 
          <Box sx={{width:"100%"}}>
            <Box width={{width:"100%",display:"flex"}}>
              <TextField
                sx={{width:"95%", mx:"auto", mt:"10px", backgroundColor:"white", borderRadius:"10px",borderColor:"white"}}
                fullWidth
                multiline
                maxRows={3}
                value={comment}
                placeholder="コメントを入力"
                onChange={(e) => setComment(e.target.value)}
              />
            </Box>
            <Box sx={{display:"flex", p:0}}>
              <Button 
                sx={{ml:"auto",mr:2, mt:"10px", p:"2px 10px", border:"1px solid white", color:"white", borderRadius:"10px", fontWeight:"bold"}}
                onClick={submitComment}
              >
                送信
              </Button>
            </Box>
          {comments?.map((comment) => (
            <PostComment comment={comment}/>
          ))}
          </Box>
        }
      </Box>
    </Box>
  );
}

export default SearchPost;