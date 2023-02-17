import { Box, TextField } from "@mui/material";
import Header from "../components/Header";

const add = () => {
  return (
    <Box sx={{backgroundSize:"contain", backgroundPosition:"center",backgroundAttachment:"fixed" ,background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/images/system/bg.jpg')", padding: "0", height:"50vh" }}>
      <Header />
      <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
        <Box ></Box>
        <TextField 
          sx={{background:"white", borderRadius:"5px"}}
          rows={4}
          multiline
        />
      </Box>
    </Box>
  );
}

export default add;