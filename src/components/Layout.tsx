import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Header } from './Header';
import React from 'react';

const Layout = React.memo((props: any) => {
  const { request } = props;
  return (
    <>
      <Box sx={{backgroundSize:"contain", backgroundColor:"rgb(0, 25, 53)" , padding:0, b:0, height:"30vh"  }}>
        <Header request={request}/>
        <Box sx={{m:0,p:0}}>
          {props.children}
        </Box>
      </Box>
    </>
  )
})

export default Layout;
