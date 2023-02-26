import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import apiAccess from "../api/api";
import { PostState } from "../recoil/post";
import Loading from "./common/Loading/Loading";

import Post from "./common/Post";

const PopularPostBox = (props:any) => {
  const { open, setOpen, setId } = props;
  const [isLoading, setIsLoading] = useState(true)
  const [newPosts, setNewPosts] = useRecoilState(PostState)
  
  const getNewPosts = () => {
    const payload = {}
    const funcSuccess = (response: any) => {
      setNewPosts(response.data.data)
      setIsLoading(false)
    }
    const funcError = (error: any) => {
      console.log(error)
    }
    apiAccess("GET_POPULAR_POSTS", funcSuccess, funcError, payload)
  }

  useEffect(() => {
    getNewPosts()
  }, [])

  return (
    <Box sx={{minHeight:"300px"}}>
      {isLoading ?
        <Loading />
      :
        <>
        {newPosts.map((post: any) => (
          <Post post={post} setId={setId} open={open} setOpen={setOpen}/>
        ))}
        </>
      }

    </Box>
  );
}

export default PopularPostBox;