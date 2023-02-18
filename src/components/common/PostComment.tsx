import { Avatar, Box, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import moment from "moment";
import { Container } from "@mui/system";

type Props = {
  comment: {
    id: number;
    content: string;
    created_at: string;
    account: any
  }
}

const PostComment = (props: Props) => {
  const { comment} = props;
  
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Box sx={{mt:"10px", pt:"10px", borderTop:"1px solid lightgray", width:"100%"}}>
      <Box sx={{display:"flex"}}>
        <Avatar sx={{width:"40px", height:"40px"}} src={comment?.account?.user_icon}/>
        <Box sx={{px:1}}>
          <Box sx={{gap:1, display:"flex", height:"15px", mb:1}}>
            <Typography sx={{fontWeight:"bold", fontSize:"15px"}}>
              {comment?.account?.username}
            </Typography>
            <Typography sx={{color:"gray", fontSize:"15px"}}>
            {moment(comment.created_at).fromNow()}
            </Typography>
            <FavoriteIcon onClick={handleLike} sx={isLiked ? {width:"16px",cursor:"pointer" ,color:"red"} : {width:"16px",cursor:"pointer"}}/>

          </Box>
          <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
            <Box sx={{width:"100%",display:"flex"}}>
              <Typography sx={{mr:"auto", fontSize:"15px", whiteSpace:"word-wrap", wordWrap:"break-word"}}>{comment?.content}</Typography>
              
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PostComment;