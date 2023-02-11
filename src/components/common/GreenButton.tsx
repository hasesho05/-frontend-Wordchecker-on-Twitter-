import { Button } from "@mui/material";

interface Props {
  onClick: () => void;
  value: string
}

const GreenButton = (props: Props) => {
  const { onClick, value } = props;
  return (
    <Button onClick={onClick} sx={[{color:"white", p:"10px", fontWeight:"bold"},()=>({'&:hover': {backgroundColor:"green"}})]}>{value}</Button>
  );
}

export default GreenButton;