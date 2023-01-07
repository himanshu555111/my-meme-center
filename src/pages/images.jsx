import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { MdOutlineCloudDownload } from "react-icons/md";
import { HiDownload } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { CardActionArea } from '@mui/material';
// import Image1 from '../assets/img1.jpg';
import { getVegImagesData } from '../APIs/veg-images';
import { getFolders } from '../APIs/folders';
import { postMediaToFolder } from '../APIs/sendMediaToFolder';
import { useEffect } from 'react';
import { useState } from 'react';
import ViewMediaModel from '../models/view-media-model';
import { useAlert, types } from 'react-alert';




function Images() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vegImagesData, setVegImagesData] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({});
  const [open, setOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [currentMediaData, setCurrentMediaData] = useState({});


  const dispatch = useDispatch();

  const alert = useAlert()

  const handleClosePopOver = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getVegImagesData({}, data => {      
      setVegImagesData(data?.data);
    }))
  }, [])

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? 'simple-popover' : undefined;

  const cardImageStyle = {
    height: 200,
    width: 'full'
  }

  const onClickImage = (res) => {
    setOpen(true);
    setSelectedMedia(res)
  }

  const sendToFolder = (folderRes) => {
    console.log('hey i i i ', currentMediaData)
    dispatch(postMediaToFolder({      
      name: currentMediaData?.name,
      catagory: currentMediaData?.catagory,
      is_veg: currentMediaData?.is_veg,
      url: currentMediaData?.url,
      media_type: currentMediaData?.media_type,
      extension:currentMediaData?.extension,
      folderName:folderRes
  }, data => {
      if(data?.status === 200){
        alert.show(`Item sent to ${folderRes} folder`, { type: types.SUCCESS });
      }else{
        alert.show("can't sent item, please try again after some time", { type: types.ERROR });
      }     
    }))
    setCurrentMediaData({});
    handleClosePopOver();
  }


  return (
    <>
      <div className='flex flex-row flex-wrap '>
        {
          vegImagesData?.map(res => (
            <Card sx={{
              maxWidth: 345, marginLeft: 4, marginTop: 4
            }}>
              <CardHeader
                sx={{ textAlign: 'left' }}
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title={
                  <>
                    <p className='text-xs text-gray-400'>uploaded by: <b className='text-my-blue text-sm'>Himanshu dixit</b> </p>
                  </>
                }
                subheader={
                  <p className='text-xs text-gray-500'>September 14, 2016</p>
                }
              />
              <CardActionArea
                onClick={() => onClickImage(res)}
              >
                <CardMedia
                  component="img"
                  // height="194"
                  style={cardImageStyle}
                  image={res?.url}
                  alt="meme image"
                />
              </CardActionArea>
              <CardActions disableSpacing sx={{
                display: 'flex', justifyContent: 'space-between',
              }}>
                <div>
                  <Tooltip title="Direct Download" arrow>
                    <IconButton aria-label="direct download">
                      <HiDownload className='text-my-blue' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Send to My Downloads" arrow>
                    <IconButton aria-describedby={id} onClick={(event)=>{
                       setAnchorEl(event.currentTarget);
                       setCurrentMediaData(res);
                       dispatch(getFolders({}, data => {
                         setFolders(data?.data)
                       }))
                    }} aria-label="send to my downloads">
                      <MdOutlineCloudDownload className='text-my-blue' />
                    </IconButton>
                  </Tooltip>
                  <Popover
                    id={id}
                    open={openPopOver}
                    anchorEl={anchorEl}
                    onClose={handleClosePopOver}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    sx={{
                      maxHeight: 300
                    }}
                  >
                    {
                      folders?.map(folderResponse => (
                        <>
                          <CardActionArea onClick={()=>sendToFolder(folderResponse?.name)}>
                            <Tooltip title={`Send to - ${folderResponse?.name}`} arrow>
                              <Typography sx={{
                                p: 2,
                                '&:hover': {
                                  background: "#263471",
                                  color: "white",
                                  cursor: "pointer"
                                }
                              }}><span className='flex flex-row'><IoIosSend className='mr-2 mt-1' />{folderResponse?.name}</span>
                              </Typography>
                            </Tooltip>
                          </CardActionArea>
                          <span className='w-full h-1 bg-gray-100 block'></span>
                        </>
                      ))
                    }
                  </Popover>
                  <IconButton toolTi aria-label="share">
                    <ShareIcon className='text-my-blue ' />
                  </IconButton>
                </div>
                <div className='flex flex-row'>
                  <div className='w-16 h-4 bg-gray-300 text-white rounded-lg text-[10px]'>#{res?.catagory}</div><span className='text-[10px] ml-1'>{` - ${res?.media_type}`}</span>
                </div>
              </CardActions>
            </Card>
          ))
        }
      </div>
      <ViewMediaModel
        setOpen={setOpen}
        open={open}
        selectedMedia={selectedMedia}
      />

    </>
  )
}

export default Images