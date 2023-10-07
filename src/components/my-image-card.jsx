import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { HiDownload } from "react-icons/hi";
import { MdOutlineCloudDownload, MdDelete } from "react-icons/md";
import Popover from '@mui/material/Popover';
import ShareIcon from '@mui/icons-material/Share';
import { postMediaToFolder } from '../APIs/sendMediaToFolder';
import { useAlert, types } from 'react-alert';
import { getFolders } from '../APIs/folders';
import { getImagesData, deleteImage } from '../APIs/images';
import { useDispatch } from 'react-redux';
import { red } from '@mui/material/colors';
import DeleteItemModal from '../models/delete-item-modal';
import Typography from '@mui/material/Typography';
import { IoIosSend } from "react-icons/io";



function MyImageCard({ imagesData, refreshItemsData, onClickImage, refreshProfileImages }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [folders, setFolders] = useState([]);
    const [currentMediaData, setCurrentMediaData] = useState({});
    const [openModal, setOpenModal] = React.useState(false);
    const [itemRes, setItemRes] = React.useState({});


    const openPopOver = Boolean(anchorEl);
    const id = openPopOver ? 'simple-popover' : undefined;

    const alert = useAlert()

    const dispatch = useDispatch();

    const sendToFolder = (folderRes) => {
        // console.log('hey i i i ', currentMediaData)
        dispatch(postMediaToFolder({
            name: currentMediaData?.name,
            category: currentMediaData?.category,
            is_veg: currentMediaData?.is_veg,
            url: currentMediaData?.url,
            media_type: currentMediaData?.media_type,
            extension: currentMediaData?.extension,
            folderName: folderRes
        }, data => {
            if (data?.status === 200) {
                alert.show(`Item sent to ${folderRes} folder`, { type: types.SUCCESS });
            } else {
                alert.show("can't sent item, please try again after some time", { type: types.ERROR });
            }
        }))
        setCurrentMediaData({});
        handleClosePopOver();
    }


    const handleClosePopOver = () => {
        setAnchorEl(null);
    };

    const cardImageStyle = {
        height: 200,
        width: 'full'
    }



    const clickOnDeleteIcon = (res) => {
        setOpenModal(state => !state);
        setItemRes(res);
    }

    const handleDeleteModalClose = () => {
        setOpenModal(state => !state);
    }

    const deleteDataOnClick = (item) => {
        // console.log(item,'item 99')
        dispatch(deleteImage({ itemId: item?._id }, data => {
            if (data?.status === 200) {
                refreshItemsData();
                refreshProfileImages();
                handleDeleteModalClose();
                alert.show('Image Deleted', { type: types.SUCCESS });
             
            } else {
                handleDeleteModalClose();
                alert.show("can't delete Image, please try again after some time", { type: types.ERROR });
            }
        }))
    }

    return (
        <div className='flex flex-row flex-wrap'>
            {
                imagesData?.map((res, index) => (
                    <>
                        <Card key={index} sx={{
                            maxWidth: 345, marginLeft: 4, marginTop: 4
                        }}>
                            <CardHeader
                                sx={{ textAlign: 'left' }}
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={res?.user_profile_image}>
                                        {res?.user_name.charAt(0)}
                                    </Avatar>
                                }
                                title={
                                    <>
                                        <Typography sx={{ textAlign: 'left', fontWeight: 600, marginBottom: '3px', fontSize: 14, }}>{res?.name}</Typography>
                                        <p className='text-xs text-gray-400'>uploaded by: <b className='text-my-yellow text-xs'>{res?.user_name}</b> </p>
                                    </>
                                }
                                subheader={
                                    <p className='text-xs text-gray-500'>{res?.uploaded_date}</p>
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
                                        <IconButton aria-describedby={id} onClick={(event) => {
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
                                                    <CardActionArea onClick={() => sendToFolder(folderResponse?.name)}>
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
                                    <Tooltip title="Delete" arrow>
                                        <IconButton onClick={() => clickOnDeleteIcon(res)} aria-label="delte">
                                            <MdDelete className='text-my-blue' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className='flex flex-row'>
                                    <div className='w-16 h-4 bg-gray-300 text-white rounded-lg text-[10px]'>#{res?.category}</div><span className='text-[10px] ml-1'>{` - ${res?.media_type}`}</span>
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
    )
}

export default MyImageCard