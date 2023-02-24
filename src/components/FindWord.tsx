import { Box, Button, CircularProgress, Divider, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GraphData, Option } from "../types/types";
import apiAccess from "../api/api";
import TextInput from "./common/TextInput";
import BlackButton from "./common/BlackButton";
Chart.register(...registerables)


const FindWord = React.memo(() => {
  const [text, setText] = useState<string>("")
  const [tweetList, setTweetList] = useState([])
  const [loading, setLoading] = useState(false)
  const [wordData, setWordData] = useState([])
  const [graphData, setGraphData] = useState<any>()
  const [options, setOptions] = useState<any>()

  const handleText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value)
  }

  const onSubmit = useCallback(() => {
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

    const funcError = (response: any) => {
      console.log(response)
      setLoading(false)
    }
    apiAccess('CHECK', funcSuccess, funcError, payload);
  },[text])

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
            '#FFB6C1',
            '#FFE4C4',
            '#FFD700',
            '#ADFF2F',
            '#00BFFF',
            '#8A2BE2',
            '#FF1493',
            '#00FFFF',
            '#FFA500',
            '#9400D3',
          ],
          // グラフの枠線の色
          borderColor: [
            '#FFB6C1',
            '#FFE4C4',
            '#FFD700',
            '#ADFF2F',
            '#00BFFF',
            '#8A2BE2',
            '#FF1493',
            '#00FFFF',
            '#FFA500',
            '#9400D3',
          ],
          // グラフの枠線の太さ
          borderWidth: 1,
        },
      ],
      options: {
        plugins: {
          title: {
            color: "white",
          },
          legend: {
            labels: {
              color: "white",
            },
          },
          tooltip: {
            bodyColor: "white",
          }
        },
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
    <Box sx={{border:"1px solid gray"}}>
      <Stack spacing={3}>
        <FormControl>
          <TextField
            sx={{width:"95%", mx:"auto", mt:"10px", backgroundColor:"white", borderRadius:"10px",borderColor:"white"}}
            fullWidth
            multiline
            maxRows={3}
            placeholder="英単語を入力"
            onChange={(e) => handleText(e)}
          />
            <br />
          <BlackButton
            value="Create"
            onClick={onSubmit}
          />
        </FormControl>
        {loading && 
          <Box sx={{width:"100%", display:"flex"}}>
            <CircularProgress sx={{mx:"auto",color:"gray"}}/>
          </Box>
        }
      </Stack>

      <Box>
        {graphData && options && 
          <Bar style={{minHeight:"180px"}} data={graphData} options={options}/>}
        {tweetList?.map((tweet: string, index:number) => (
          <Box key={index} sx={{backgroundColor:"white", borderRadius:2, p:2, mt:2}}>
            <Typography color="black">{tweet}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
})

export default FindWord;