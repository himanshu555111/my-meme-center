import React from 'react'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { Button, TextField, CardMedia } from '@mui/material';

function UploadVideo() {
    return (
        <>
            <Grid container spacing={2} sx={{ marginTop: 4, bgcolor: "#efefef", padding: 2, borderRadius: '10px' }}>
                <Grid item xs={12}>
                    <Box sx={{ bgcolor: 'white', height: '150px', boxShadow: '0px 5px 30px rgb(0 0 0 / 0.1)', borderRadius: '10px' }}>
                        <CardMedia
                            component="img"
                            image={"https://i.ibb.co/gJQRD50/Image-upload-rafiki.png"}
                            // https://i.ibb.co/QrwzjST/34.jpg
                            alt="uploading image"
                            sx={{ objectFit: 'cover', height: '150px', width: 'fit-content', borderRadius: '10px', bgcolor: 'white' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%', bgcolor: 'white' }} id="image-name" label="Name of Video" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%', bgcolor: 'white' }} select id="image-category" label="Select Category" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%', bgcolor: 'white' }} select id="image-type" label="Select Type" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField sx={{ width: '100%', bgcolor: 'white' }} select id="image-ext" label="Select Extension" variant="outlined" />
                </Grid>
            </Grid>
        </>
    )
}

export default UploadVideo