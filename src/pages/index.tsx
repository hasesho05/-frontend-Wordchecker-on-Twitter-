import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import apiAccess from './api/api';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)


export default function Home() {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [text, setText] = useState<string>("")
  const [tweetList, setTweetList] = useState([])
  const [loading, setLoading] = useState(false)
  const [wordData, setWordData] = useState([])
  const [graphData, setGraphData] = useState<any>("")
  const [options, setOptions] = useState<any>("")
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
    setWordData([])
    setLoading(true)
    setTweetList([])
    const payload = {
      id: text
    };

    const funcSuccess = (response: any) => {
      setTweetList(response.data.tweetList)
      setWordData(response.data.counter)
      setLoading(false)
    }
    apiAccess('CHECK', funcSuccess, payload);
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  useEffect(() => {
    let word:Array<string> = []
    let number:Array<number> = []
    wordData.forEach((data: any) => {
      word.push(data[0])
      number.push(data[1])
    })
    
    setGraphData({
      // x 軸のラベル
      labels: [...word],
      datasets: [
        {
          label: '単語の出現回数',
          // データの値
          data: [...number],
          // グラフの背景色
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgb(235, 186, 245, 0.2)',
            'rgb(245, 201, 186, 0.2)',
            'rgb(245, 235, 186, 0.2)',
            'rgb(196, 245, 186, 0.2)',
          ],
          // グラフの枠線の色
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(235, 186, 245)',
            'rgb(245, 201, 186)',
            'rgb(245, 235, 186)',
            'rgb(196, 245, 186)',
          ],
          // グラフの枠線の太さ
          borderWidth: 1,
        },
      ],
      options: {
        scales: {
          "yaxes_1" : {
            beginAtZero: true
          }
        }
    }
    })

  },[wordData])

  useEffect(() => {

    setOptions({
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: text,
        },
      },
    })
  },[text])



  return (
    <Container>
      <Box sx={{mx:"auto", maxWidth:"700px", backgroundColor:"#f2f2f2", height:"100%"}}>
        {isHeaderShown && <Header />}
        <Box p={10}>
          <Stack spacing={3}>
            <Typography variant='h1' fontSize={30}>英単語を入力</Typography>
            <TextField required label="word" type="text" onChange={(e)=>handleText(e)}/>
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
                <CircularProgress sx={{ml:"250px",color:"gray"}}/>
              </Box>
            }
          </Stack>

          <Box>
            {graphData && options && <Bar data={graphData} options={options}/>}
            {tweetList?.map((tweet: string, index:number) => (
              <Box key={index} sx={{backgroundColor:"white", borderRadius:2, p:2, mt:2}}>
                <Typography color="black">{tweet}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
