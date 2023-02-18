import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import { useEffect, useState } from "react";
import apiAccess from "../api/api";
import Loading from "./common/Loading/Loading";

import Post from "./common/Post";

const NewPostBox = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newPosts, setNewPosts] = useState([])
  
  const getNewPosts = () => {
    const payload = {}
    const funcSuccess = (response: any) => {
      setNewPosts(response.data.data)
      setIsLoading(false)
    }
    const funcError = (error: any) => {
      console.log(error)
    }
    apiAccess("GET_NEW_POSTS", funcSuccess, funcError, payload)
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
          <Post post={post}/>
        ))}
        </>
      }

    </Box>
  );
}

export default NewPostBox;