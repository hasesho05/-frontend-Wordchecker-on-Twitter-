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
  const [graphData, setGraphData] = useState<GraphData>()
  const [options, setOptions] = useState<Option>()

  const handleText = useMemo(() => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value)
  },[])

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
    <>
      <Stack spacing={3}>
        <FormControl>
          <TextInput 
            fullWidth={true}
            required={true}
            label={"英単語を入力"}
            multiline={false}
            rows={1}
            value={text}
            type={"text"}
            onChange={(e)=>handleText(e)}
          />
            <br />
          <BlackButton
            value="Create"
            onClick={onSubmit}
          />
        </FormControl>
        {loading && 
          <Box sx={{width:"100%"}}>
            <CircularProgress sx={{ml:"250px",color:"gray"}}/>
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
    </>
  );
})

export default FindWord;