import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { BsImages } from 'react-icons/bs';
import { RiVideoAddFill } from 'react-icons/ri';
import { SiAudiomack } from 'react-icons/si';

import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import UploadImage from './upload-image';
import UploadVideo from './upload-video';



function UploadMedia() {
  const [whichMedia, setWhichMedia] = useState('image');


  const handleImageCardClick = () => {
    setWhichMedia('image');
  }

  const handleVideoCardClick = () => {
    setWhichMedia('video');
  }

  const handleAudioCardClick = () => {
    setWhichMedia('audio');
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', width: 'auto', justifyContent: 'space-between' }}>
          <Card onClick={handleImageCardClick} sx={{marginTop:4}}>
            <CardActionArea>
              <IconButton sx={{ margin: 2 }}>
                <BsImages className='text-[50px] text-my-yellow bg-my-blue p-2 rounded' />
              </IconButton>


              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "700", color: '#263471' }}>
                  IMAGE UPLOAD
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can upload your images here
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card onClick={handleVideoCardClick} sx={{marginTop:4}}>
            <CardActionArea>
              <IconButton sx={{ margin: 2 }}>
                <RiVideoAddFill className='text-[50px] text-my-yellow bg-my-blue p-2 rounded' />
              </IconButton>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "700", color: '#263471' }}>
                  VIDEO UPLOAD
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can upload your video here
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card onClick={handleAudioCardClick} sx={{marginTop:4}}>
            <CardActionArea>
              <IconButton sx={{ margin: 2 }}>
                <SiAudiomack className='text-[50px] text-my-yellow bg-my-blue p-2 rounded' />
              </IconButton>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "700", color: '#263471' }}>
                  AUDIO UPLOAD
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can upload your audio here
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        {whichMedia === 'image' && <UploadImage />}
        {whichMedia === 'video' && <UploadVideo />}
        {whichMedia === 'audio' && <UploadImage />}

      </Container>
    </>
  )
}

export default UploadMedia