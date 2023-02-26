import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { Container } from "semantic-ui-react";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userStatusState } from "../../recoil/userstatus";
import apiAccess from "../../api/api";
import PostComment from "./PostComment";

interface Props {
  post: any;
}

const ProfilePost = (props:Props) => {
  const { post } = props;

  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState("")
  const userStatus = useRecoilValue(userStatusState)
  

  const addLike = () => {
    const payload = {
      post_id: post.id,
      account_id: userStatus.id,
    }

    const funcSuccess = (response: any) => {
      setIsLiked(true);
      post.like.push(userStatus.id);
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
      setComments([...comments, response.data]);
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

  return (
  <Box sx={{p:2, border:"1px solid darkgray", width:"100%"}}>
    {post.image &&
    <Box sx={{position:"relative", minHeight:"300px", width:{xs:"100%", sm:"100%"}, display:"flex"}}>
      <Image src={post.image} fill alt="post_image" objectFit="contain" style={{margin:"0 auto"}}/>
    </Box>
    }
    <Box sx={{p:2}}>
      <Typography sx={{color:"white", fontSize:"15px"}}>{post.content}</Typography>
    </Box>
    <Box sx={{display:"flex", gap:1, mr:2}}>
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
  );
}

export default ProfilePost;