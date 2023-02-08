import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { SignUpModal } from "./Modal";

export default function Header() {
  const [signUpModalopen, setSignUpModalopen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignUp = () => {
    setSignUpModalopen(true)
    handleClose();
  }

  const ProfileMenu = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Login</MenuItem>
        <MenuItem onClick={handleSignUp}>Signup</MenuItem>
      </Menu>
    )
  }

  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{backgroundColor:"#598B2C"}}>
        <Toolbar >
          <Typography sx={{fontWeight:"bold", fontSize:20}}>WordChecker</Typography>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml:"auto", mr:2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <ProfileMenu />
      {signUpModalopen &&
        <SignUpModal 
          signUpModalopen={signUpModalopen}
          setSignUpModalopen={setSignUpModalopen}
        />}
    </Box>
  );



}

