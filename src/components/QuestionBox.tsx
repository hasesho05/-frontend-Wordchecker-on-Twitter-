import { Box, Typography } from "@mui/material";
import Question from "./Question";
import quizset from "../data/quizset.json";
import { useEffect, useState } from "react";

const QuestionBox = () => {
  const [randomItem, setRandomItem] = useState<any>("");

  useEffect(() => {
    const lastItem = localStorage.getItem('lastItem'); // 前日に選択された要素を取得
    if (!lastItem) {
      localStorage.setItem('lastItem', quizset[0].question); 
    }
    const availableItems = quizset.filter(item => item.question !== lastItem); // 前日に選択された要素以外の配列要素のみを抽出
    const randomIndex = Math.floor(Math.random() * availableItems.length); // 抽出された配列要素の中からランダムに一つ選択
    const newItem = availableItems[randomIndex];

    localStorage.setItem('lastItem', newItem.question); // 今日の選択された要素を保存
    setRandomItem(newItem); // 選択された要素を状態変数に保存
  }, []);

  return (
    <Box sx={{width:"320px", maxHeight:"500px",background:"rgb(0, 40, 70)", overflow:"scroll", '& ::-webkit-scrollbar': {display: "none"}, position:"absolute", transform:"translate(550px, 550px)"}}>
      <Box className="recommend"  sx={{display:"flex", justifyContent:"center", alignItems:"center", borderBottom:"1px solid  rgba(200,200,200,0.3)", position:"sticky", top:"0", zIndex:"10"}}>
        {randomItem && <Question quiz={randomItem}/>}
      </Box> 
    </Box>
  );
}

export default QuestionBox;