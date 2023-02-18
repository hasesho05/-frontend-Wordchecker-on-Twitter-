import { Avatar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiAccess from "../../api/api";

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import PostComment from "./PostComment";

interface Props {
  post: any;
}

const Post = (props:Props) => {
  const { post } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState("")

  const addLike = () => {
    const payload = {
      account_id: "",
      post_id: post.id,
    }

    const funcSuccess = (response: any) => {
      setIsLiked(true);
      post.like.push("");
      console.log(response.data);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('ADD_LIKE', funcSuccess, funcError, payload);
  }

  const removeLike = () => {
    const payload = {
      account_id: "",
      post_id: post.id,
    }
    const funcSuccess = (response: any) => {
      setIsLiked(false);
      post.like.pop("");
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('REMOVE_LIKE', funcSuccess, funcError, payload);
  }

  const submitComment = () => {

  }

  return (
    <Box sx={{mb:"20px", backgroundColor:"rgb(34,34,34)"}}>
      <Box sx={{display:"flex"}}>
        <IconButton>
          <Avatar src={post.account.user_icon} sx={{width:"60px", height:"60px", mb:"auto", borderRadius:"10px"}}/>
        </IconButton>
        <Box sx={{display:"flex"}}>
          <Typography sx={{my:"auto"}}>{post.account.username}</Typography>
          <Typography sx={{ml:"20px",my:"auto", color:"#00B8FF", fontWeight:"bold"}}>フォロー</Typography>
        </Box>
      </Box>
        <Box sx={{backgroundColor:"rgb(34,34,34)"}}>
          <Box sx={{position:"relative", minHeight:"500px", width:"100%", borderRadius:"50px"}}>
            <Image src={post.image} alt={post.content} fill objectFit="cover" loading="eager" placeholder="blur" blurDataURL="blur.png"/>
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
          <Container sx={{display:"flex", p:0}}>
            <Button 
              sx={{ml:"auto", mt:"10px", p:"2px 10px", border:"1px solid white", color:"white", borderRadius:"10px", fontWeight:"bold"}}
              onClick={submitComment}
            >
              送信
            </Button>
          </Container>
        {comments.map((comment) => (
          <PostComment comment={comment}/>
        ))}
        </Box>
      }
    </Box>
  );
}

export default Post;