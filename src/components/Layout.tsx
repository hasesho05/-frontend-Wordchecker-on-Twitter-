import Head from 'next/head';
import { Box, Container } from '@mui/material';
import Header from './Header';

const Layout = (props: any) => {

  return (
    <>
      <Box sx={{backgroundSize:"contain", backgroundColor:"rgb(0, 25, 53)" , padding:0, b:0, height:"30vh"  }}>
        <Header request={props.request}/>
        <Box sx={{m:0,p:0}}>
          {props.children}
        </Box>
      </Box>
    </>
  )
}

export default Layout;
