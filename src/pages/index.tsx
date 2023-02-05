import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import apiAccess from './api/api';

export default function Home() {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [text, setText] = useState<string>("")
  const [tweetList, setTweetList] = useState([])
  const [loading, setLoading] = useState(false)
  const headerHeight = 40;

  const scrollEvent = useCallback(() => {
    const position = window.pageYOffset;
    const isHeaderShown = position < currentPosition || position < headerHeight;
    setIsHeaderShown(isHeaderShown);
    setCurrentPosition(position);
  }, []);

  const handleText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value)
  } 

  const onSubmit = () => {
    setLoading(true)
    setTweetList([])
    const payload = {
      id: text
    };

    // const funcSuccess = (response: any) => {
    //   setTweetList(response.data)
    //   setLoading(false)
    // }
    // apiAccess('CHECK', funcSuccess, payload);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  useEffect(() => {
    console.log(tweetList);
    
  },[tweetList])

  return (

    <Container>
      <Box sx={{mx:"auto", maxWidth:"700px", backgroundColor:"lightgray", height:"100%"}}>
        {isHeaderShown && <Header />}
        <Box p={10}>
          <Stack spacing={3}>
            <Typography variant='h1' fontSize={30}>ユーザーIDを入力</Typography>
            <TextField required label="user_id" type="text" onChange={(e)=>handleText(e)}/>
            <Button 
              sx={[{backgroundColor:"black"},()=>({'&:hover': {backgroundColor:"black"}})]}  
              variant="contained" 
              size="large"
              onClick={onSubmit}
            >
              Create
            </Button>
            {loading && 
            <Box sx={{width:"100%"}}>
              <CircularProgress sx={{mx:"auto",mt:"50px",color:"gray"}}/>
            </Box>
            }
          </Stack>

          <Box>
            {tweetList?.map((tweet: any) => (
              <Box sx={{backgroundColor:"white", borderRadius:2, p:2, mt:2}}>
                <Typography color="black">{tweet}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
