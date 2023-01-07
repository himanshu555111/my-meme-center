import React from 'react'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import CardMedia from '@mui/material/CardMedia';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ViewMediaModel(props) {

  // const [view ,setView] = useState('');
  const handleClose = () => {
    props?.setOpen(false);
  };

  const mediaStyle = {
    height: 'full',
    width: 'full'
  }


  // console.log('clicked', props?.open)
  return (
    <>
      <Dialog   
        open={props?.open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <AppBar sx={{ position: 'relative', bgcolor: "#263471" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Previewing {props?.selectedMedia?.media_type}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>

        <CardMedia
          component="img"
          image={props?.selectedMedia?.url}
          style={mediaStyle}
          alt="meme image"
        />

      </Dialog>
    </>
  )
}

export default ViewMediaModel