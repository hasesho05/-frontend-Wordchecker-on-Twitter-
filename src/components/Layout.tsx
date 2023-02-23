import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Header } from './Header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout = (props:Props) => {
  return (
    <>
      <Box sx={{backgroundSize:"contain", backgroundColor:"rgb(0, 25, 53)" , padding:0, b:0 }}>
        <Header />
        <Box sx={{m:0,p:0}}>
          {props.children}
        </Box>
      </Box>
    </>
  )
} 

export default Layout;
