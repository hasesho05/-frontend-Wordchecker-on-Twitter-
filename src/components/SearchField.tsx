import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const SearchField = (props: any) => {
  const router = useRouter();
  const [value, setValue] = useState();

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      const query = encodeURIComponent(e.target.value);
      router.push(`/search?q=${query}`);
    }
  }

  useEffect(() => {
    setValue(props.query);
  }, [props.query]);

  const style = {
    width:"90%",
    ml:"10px",
    mt:"5px", 
    backgroundColor:"white",
    borderRadius:"10px",
    borderColor:"white",
    "& .MuiInputBase-input": {padding:"5px"},
    '&:focus': {outline: 'none'}}

  return (
    <Box>
      <Box sx={{ marginBottom: "-2px"}}>
        <TextField 
          type="text" 
          placeholder='Search' 
          className="search"
          value={value} 
          sx={style}
          onChange={handleChange} 
          onKeyDown={handleSearch} 
          InputProps={{
            style: {
              padding:0,
              outline:"none"
            },
            startAdornment: (
              <InputAdornment position="start">
                  <SearchIcon />
              </InputAdornment>
            ),
        }}
        />
      </Box>
    </Box>
  )
}

export default SearchField;