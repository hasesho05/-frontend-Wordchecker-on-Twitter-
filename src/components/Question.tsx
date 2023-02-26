import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
}

const Question = (props: Props) => {
  const { quiz } = props;
  const [answered, setAnswered] = useState(false);

  const clickAnswer = (index: number) => {
    setAnswered(true);
  };

  const style = {
    width:"90%",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "white",
    border: "1px solid white",
    borderRadius: "10px",
    textTransform: "none",
    "&:hover": { background: "rgba(255,255,255,0.2)" },
  };

  return (
    <Box sx={{pb:3}}>
      <Box
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          margin: "10px 0",
        }}
      >
        <Typography sx={{fontSize:"16px", fontWeight:"bold", mb:"20px"}}>{quiz.question}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {quiz.options.map((option, index) => (
          <Button
            key={index}
            sx={[style, answered && quiz.correctAnswer === index && { backgroundColor: "green", "&:hover": { background: "green" } }, answered && quiz.correctAnswer !== index && { backgroundColor: "rgba(240,50,50,0.5)", "&:hover": { background: "rgba(240,50,50,0.5)" } }]}
            onClick={() => clickAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Question;
