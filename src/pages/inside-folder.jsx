import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getInsideFolderData, deleteInsideFolderData } from '../APIs/inside-folder';
import Button from '@mui/material/Button';
import {
  MdKeyboardBackspace
} from "react-icons/md";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { HiDownload } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ViewMediaModel from '../models/view-media-model';
import DeleteItemModal from '../models/delete-item-modal';
import { useAlert, types } from 'react-alert';
import useDownloader from "react-use-downloader";
import {LinearProgress} from '@material-ui/core';
function InsideFolder() {
  const [insideFolderData, setInsideFolderData] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [itemRes, setItemRes] = React.useState({});


  const {
    size,
    elapsed,
    percentage,
    download,
    cancel,
    error,
    isInProgress
  } = useDownloader();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const alert = useAlert()


  const refreshItemsData = () => {
    dispatch(getInsideFolderData({ folderName: id, itemName: `${id}-folder` }, data => {
      // console.log(data, '88795')
      setInsideFolderData(data?.data)
    }))
  }

  useEffect(() => {
    refreshItemsData();
  }, [])

  const onClickImage = (res) => {
    setOpen(true);
    setSelectedMedia(res)
  }

  const cardImageStyle = {
    height: 200,
    width: 'full'
  }

  const deleteDataOnClick = (item) => {

    dispatch(deleteInsideFolderData({ folderName: id, itemName: item?.name }, data => {
      if (data?.status === 200) {
        refreshItemsData();
        handleDeleteModalClose();
        alert.show('Item Deleted', { type: types.SUCCESS });
      } else {
        handleDeleteModalClose();
        alert.show("can't delete media, please try again after some time", { type: types.ERROR });
      }
    }))
  }

  const clickOnDeleteIcon = (res) => {
    setOpenModal(state => !state);
    setItemRes(res);
  }

  const handleDeleteModalClose = () => {
    setOpenModal(state => !state);
  }

  return (
    <>
    {percentage ? <LinearProgress variant="determinate" value={percentage} /> : null}
      {
        insideFolderData.length >= 1 ?
          <>
            <div className='flex flex-row flex-wrap '>
            
              {
                insideFolderData?.map(res => (
                  <>
                    <Card sx={{
                      maxWidth: 345, marginLeft: 4, marginTop: 4
                    }}>
                      <CardHeader
                        sx={{ textAlign: 'left' }}
                        avatar={
                          <Avatar sx={{ bgcolor: "#344698" }} aria-label="recipe">
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
                          image={res?.url}
                          style={cardImageStyle}
                          alt="meme image"
                        // sx={{
                        //   ":hover": {
                        //     cursor: 'pointer'
                        //   }
                        // }}
                        />
                      </CardActionArea>
                      
                      <CardActions disableSpacing
                        sx={{
                          display: 'flex', justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <Tooltip title="Direct Download" arrow>                         
                              <IconButton onClick={() => download(res?.url, `${res?.name}.${res?.extension}`)} aria-label="direct download">
                                <HiDownload className='text-my-blue' />
                              </IconButton>                             
                          </Tooltip>

                          <Tooltip title="Share" arrow>
                            <IconButton aria-label="share">
                              <ShareIcon className='text-my-blue ' />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => clickOnDeleteIcon(res)} aria-label="delte">
                              <MdDelete className='text-my-blue ' />
                            </IconButton>
                          </Tooltip>

                        </div>
                        <div className='flex flex-row'>
                          <div className='w-16 h-4 bg-gray-300 text-white rounded-lg text-[10px]'>#{res?.catagory}</div><span className='text-[10px] ml-1'>{` - ${res?.media_type}`}</span>
                        </div>
                      </CardActions>
                    </Card>
                    <DeleteItemModal
                      setOpenModal={setOpenModal}
                      openModal={openModal}
                      deleteDataOnClick={deleteDataOnClick}
                      itemRes={itemRes}
                      handleDeleteModalClose={handleDeleteModalClose}
                      head={`Do you want to delete this ${res?.media_type}?`}
                    />
                  </>
                ))
              }
            </div>

          </>
          :
          <div className='flex flex-col items-center justify-center'>
            <p className='text-red-700 text-lg mt-10'>Folder is Empty</p>
            <Button
              key={'goback'}
              onClick={() => {
                navigate('/mydashboard/mydownloads')
              }}
              sx={{
                my: 2, mt: 4, color: '#263471', display: 'block', border: 1,
                textTransform: 'unset',
                ':hover': {
                  bgcolor: '#344698',
                  color: 'white',
                  border: 0
                },
              }}
            >
              <span className='flex flex-row font-medium'><MdKeyboardBackspace className='text-xl mr-2 mt-[1px]' />{'Go Back'}</span>

            </Button>
          </div>
      }
      <ViewMediaModel
        setOpen={setOpen}
        open={open}
        selectedMedia={selectedMedia}
      />

    </>
  )
}

export default InsideFolder