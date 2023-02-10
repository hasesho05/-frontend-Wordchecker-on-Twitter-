import { Button } from "@mui/material";
import React from "react";

interface Props {
  value: string;
  onClick: () => void;
}

const BlackButton = React.memo((props:Props) => {
  const { value, onClick } = props;
  return (
    <Button 
      sx={[{mt:"20px" ,backgroundColor:"black"},()=>({'&:hover': {backgroundColor:"black"}})]}  
      variant="contained" 
      size="large"
      onClick={onClick}
    >
      {value}
    </Button>
  );
})

export default BlackButton;