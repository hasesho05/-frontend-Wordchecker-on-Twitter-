import { Button } from "@mui/material";
import React from "react";

interface Props {
  value: string;
  onClick: any;
}

const BlackButton = React.memo((props:Props) => {
  const { value, onClick } = props;
  return (
    <Button 
      sx={[{my:"10px" ,backgroundColor:"black"},()=>({'&:hover': {backgroundColor:"black"}})]}  
      variant="contained" 
      size="large"
      fullWidth
      onClick={onClick}
    >
      {value}
    </Button>
  );
})

export default BlackButton;