import { Avatar, Box, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";
import { useRecoilValue } from "recoil";
import { userStatusState } from "../../recoil/userstatus";
import apiAccess from "../../api/api";

type Props = {
  comment: any;
}

const PostComment = (props: Props) => {
  const { comment } = props;
  const account = comment.account;
  const userStatus = useRecoilValue(userStatusState)
  
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    const payload = {
      comment_id: comment.id,
      account_id: userStatus.id,
    }

    const funcSuccess = (response: any) => {
      setIsLiked(true);
      comment.like.push(userStatus.id);
      console.log(response.data);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('ADD_COMMENTLIKE', funcSuccess, funcError, payload);
  };

  const removeLike = () => {
    const payload = {
      account_id: userStatus.id,
      comment_id: comment.id,
    }
    const funcSuccess = (response: any) => {
      setIsLiked(false);
      comment.like.pop(userStatus.id);
    }
    const funcError = (error: any) => {
      console.log(error);
    }
    apiAccess('REMOVE_COMMENTLIKE', funcSuccess, funcError, payload);
  }

  useEffect(() => {
    if (comment?.like?.includes(userStatus.id)) {
      setIsLiked(true);
    }
  }, [comment])

  return (
    <Box sx={{mt:"10px", pt:"10px", borderTop:"1px solid lightgray", width:"100%"}}>
      <Box sx={{display:"flex"}}>
        <Avatar sx={{width:"40px", height:"40px"}} src={account?.user_icon}/>
        <Box sx={{px:1}}>
          <Box sx={{gap:1, display:"flex", height:"15px", mb:1}}>
            <Typography sx={{fontWeight:"bold", fontSize:"15px"}}>
              {account?.username}
            </Typography>
            <Typography sx={{color:"gray", fontSize:"15px"}}>
            {moment(comment.created_at).fromNow()}
            </Typography>
            <FavoriteIcon onClick={!isLiked ? handleLike : removeLike} sx={!isLiked ? {width:"16px",cursor:"pointer", color:"red"} : {width:"16px",cursor:"pointer"}}/>
          </Box>
          <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
            <Box sx={{width:"100%",display:"flex"}}>
              <Typography sx={{color:"white",mr:"auto", fontSize:"15px", whiteSpace:"word-wrap", wordWrap:"break-word"}}>{comment?.content}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PostComment;