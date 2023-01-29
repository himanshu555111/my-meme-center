import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
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
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', }}>
          <Card onClick={handleImageCardClick} sx={{ maxWidth: 345, marginTop: 4 }}>
            <CardActionArea>
              <IconButton sx={{ margin: 2 }}>
                <CropOriginalIcon sx={{ fontSize: '50px', bgcolor: '#263471', borderRadius: '100%', color: "#fed800", padding: 1 }} />
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

          <Card onClick={handleVideoCardClick} sx={{ maxWidth: 345, marginTop: 4 }}>
            <CardActionArea>
              <IconButton sx={{ margin: 2 }}>
                <VideoCallIcon sx={{ fontSize: '50px', bgcolor: '#263471', borderRadius: '100%', color: "#fed800", padding: 1 }} />
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

          <Card onClick={handleAudioCardClick} sx={{ maxWidth: 345, marginTop: 4 }}>
            <CardActionArea>
              <IconButton sx={{ margin: 2 }}>
                <GraphicEqIcon sx={{ fontSize: '50px', bgcolor: '#263471', borderRadius: '100%', color: "#fed800", padding: 1 }} />
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