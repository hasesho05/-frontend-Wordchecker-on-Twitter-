import React, { useCallback, useEffect, useState } from 'react';
import { Container, IconButton } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

interface Props {
  className: string;
  upNum : number;
  theme : "white"|"black";
}

const MenuSlider = (props:Props) => {
  const {theme, className, upNum} = props;
  const [style, setstyle] = useState<any>("")

  useEffect(()=> {
    if (theme === "white") {
      setstyle([{p:"10px", backgroundColor:"rgba(255,255,255,0.7)", borderRadius:"50%", zIndex:"10000"},()=>({'&:hover': {backgroundColor:"rgba(200,200,200,0.7)"}})]);
    } else if (theme === "black") {
      setstyle([{p:"10px", backgroundColor:"rgba(0,0,0,0.1)", borderRadius:"50%", zIndex:"10000"},()=>({'&:hover': {backgroundColor:"rgba(150,150,150,150)"}})])
    }
  },[])


  let scroll_pos = 0;
  const HandleMenuScroll = useCallback((direction: string) => {
    const menuSlider = document.querySelector(`${className}`);

    if (menuSlider !== null){
      if (direction === 'right' && scroll_pos < menuSlider.children.length - 1){
        let width = menuSlider.children[scroll_pos].getBoundingClientRect().width;
        menuSlider.scrollLeft += Math.round(width / 5) * 10;
        scroll_pos += 1;
      }
      else if (direction === 'left' && scroll_pos > 0){
        let width = menuSlider.children[scroll_pos].getBoundingClientRect().width;
        if (scroll_pos == 1){
          menuSlider.scrollLeft = 0;
        }else {
          menuSlider.scrollLeft -= Math.round(width / 5) * 10;
        }
        scroll_pos -= 1;
      }
    }
  },[scroll_pos])

  return (
    <Container sx={{w: "100%", display: "flex", justifyContent: "space-between", transform: `translate(0px, -${upNum}px)`}}>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        sx={style}
        onClick={()=>HandleMenuScroll("left")}
      >
        <ArrowLeftIcon />
      </IconButton>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        sx={style}
        onClick={()=>HandleMenuScroll("right")}
      >
        <ArrowRightIcon />
      </IconButton>
    </Container>
  );
}

export default MenuSlider;
