import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../APIs/auth';
import uploadVector from '../assets/upload_vector.jpg';
import { FiEdit } from 'react-icons/fi';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import EditProfileModel from '../models/edit-profile-model';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop';
import { UseDebounceEffect } from './useDebounceEffect';
import { CanvasPreview } from '../models/canvas-preview';
import { useAlert, types } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { updateRegisteredUser } from '../APIs/auth';
import { set_user_info } from '../redux/features/user-slice';
import MyImageCard from '../components/my-image-card';
import ViewMediaModel from '../models/view-media-model';
import { getImagesData, deleteImage } from '../APIs/images';
import { useMemo } from 'react';


function Profile() {

    const [loggedInUserData, setLoggedInUserData] = useState();
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [aspect, setAspect] = useState(16 / 16);
    const [output, setOutput] = useState('');
    const [openCropImageDialog, setOpenCropImageDialog] = useState(false);
    const [imagesData, setImagesData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState({});
    // const [isImagesFiltered, setIsImagesFiltered] = useState(false);
    





    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const userInfo = useSelector((state) => state.user.user_info);

    // console.log(userInfo,'userInfo')

    const inputForImage = useRef(null);
    const inputForCoverImage = useRef(null);
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const navigate = useNavigate();
    const alert = useAlert();


    function centerAspectCrop(
        mediaWidth,
        mediaHeight,
        aspect,
    ) {
        return centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 90,
                },
                aspect,
                mediaWidth,
                mediaHeight,
            ),
            mediaWidth,
            mediaHeight,
        )
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
                setOpenCropImageDialog(true)
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onSelectCoverFile(e) {
        const formDataForCoverUpload = new FormData();
        formDataForCoverUpload.append('image', e.target.files[0])
        formDataForCoverUpload.append('token', token);
        formDataForCoverUpload.append('user_name', userInfo?.user_name);
        
       
        
        if (e.target.files[0]) {
            formDataForCoverUpload.append('has_cover_pic', true)
        } else {
            formDataForCoverUpload.append('has_cover_pic', false)
        }
        dispatch(updateRegisteredUser(formDataForCoverUpload, data => {
            if (data?.status === 200 && data?.data?.okStatus === true) {
                setIsUserUpdated(state => !state);
                alert.show(`Cover Updated successfully`, { type: types.SUCCESS });
            } else {
                alert.show("Sorry, something went wrong, try after sometime", { type: types.ERROR });
            }
        }))
    }

    const handlePickImage = () => {
        inputForImage.current.click();
    }

    const handlePickCoverImage = () => {
        inputForCoverImage.current.click();
    }

    const onClickImage = (res) => {
        setOpen(true);
        setSelectedMedia(res)
    }



    useEffect(() => {
        dispatch(getUserDetails({ token: token }, data => {
            console.log(data?.data?.data,'1')
            if (data?.data?.status === 'ok') {
                setLoggedInUserData(data?.data);
                dispatch(set_user_info(data?.data?.data))
                refreshProfileImages(data?.data?.data);
            }
        }))
    }, [isUserUpdated, openCropImageDialog])




    const refreshProfileImages = (userData) => {     
        dispatch(getImagesData({ userId: userData?.user_id, isVeg:true }, data => {
            
            const filteredImagesByUserId = data?.data?.filter(res => (
                res?.user_id === userData?.user_id
            )) 
            // console.log(filteredImagesByUserId,'filter44')        
            setImagesData(filteredImagesByUserId);           
        }))
    }



    const handleEditProfile = () => {
        setOpenEditProfile(true)
    }


    const handleClose = () => {
        setOpenCropImageDialog(false)
        setCrop();
        setCompletedCrop();
        setImgSrc('');
        setOutput('');
    }

    const handleCropNow = (canvas, image) => {

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');

        const pixelRatio = window.devicePixelRatio;
        canvas.width = completedCrop.width * pixelRatio;
        canvas.height = completedCrop.height * pixelRatio;
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height,
        );

        // Converting to base64
        const base64Image = canvas.toDataURL('image/jpeg');

        setOutput(base64Image);

        if (output) {
            fetch(output).then(res => res.blob()).then(blob => {
                const formDataForProfileUpload = new FormData();
                const file = new File([blob], "profileImage.jpeg");
                formDataForProfileUpload.append('image', file)
                formDataForProfileUpload.append('token', token);
                formDataForProfileUpload.append('user_id', userInfo?.user_id);
                formDataForProfileUpload.append('user_name', userInfo?.user_name);
                if (output === '' || output === undefined) {
                    formDataForProfileUpload.append('has_profile_pic', false)
                } else {
                    formDataForProfileUpload.append('has_profile_pic', true)
                }

                dispatch(updateRegisteredUser(formDataForProfileUpload, data => {
                    if (data?.status === 200 && data?.data?.okStatus === true) {
                        alert.show(`Image Updated successfully`, { type: types.SUCCESS });
                        handleClose();
                        setImgSrc('');
                        setOutput('');
                    } else {
                        alert.show("Sorry, something went wrong, try after sometime", { type: types.ERROR });
                    }
                }))
            })
        } else {
            console.log('no output')
        }
    }

    UseDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                CanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,

                )
            }
        },
        100,
        [completedCrop],
    )

    return (

        <>
            <div className='relative'>
                <div className="bg-gradient-to-r from-sky-500 to-indigo-500">
                    {loggedInUserData?.data?.has_cover_pic === false ?
                        <img onClick={handlePickCoverImage} className="object-cover h-[20rem] w-full hover:cursor-pointer" src={"https://i.ibb.co/z654xFk/bg-walp.jpg"} alt="background" /> : <img onClick={handlePickCoverImage} className="object-cover h-[20rem] w-full hover:cursor-pointer" src={loggedInUserData?.data?.cover_url || "https://i.ibb.co/z654xFk/bg-walp.jpg"} alt="background" />
                    }

                    <input className="hidden" type="file" accept="image/png, image/gif, image/jpeg" name="image" onChange={onSelectCoverFile} ref={inputForCoverImage} multiple={false}></input>

                </div>

                <section class="absolute bg-blueGray-200 mt-[10rem] mx-auto inset-x-0 ">

                    <div class="container mx-auto px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div class="px-6">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-fit lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        {!!imgSrc && (
                                            <Dialog onClose={handleClose} open={openCropImageDialog}>
                                                <DialogTitle sx={{ fontWeight: 600 }} >Crop your profile Image</DialogTitle>
                                                <div className='flex flex-row'>
                                                    <div>
                                                        <ReactCrop
                                                            crop={crop}
                                                            onChange={(_, percentCrop) => {
                                                                setCrop(percentCrop)
                                                            }}
                                                            onComplete={(c) => { setCompletedCrop(c) }}
                                                            aspect={aspect}
                                                        >
                                                            <img
                                                                ref={imgRef}
                                                                alt="Crop me"
                                                                src={imgSrc}
                                                                onLoad={onImageLoad}
                                                            />
                                                        </ReactCrop>
                                                        <Button
                                                            key={'crop now'}
                                                            sx={{
                                                                mx: 1, my: 1, color: 'white', bgcolor: '#344698',
                                                                textTransform: 'unset',
                                                                ':hover': {
                                                                    bgcolor: '#314dbc',
                                                                    color: 'white'
                                                                },
                                                                ':active': {
                                                                    bgcolor: '#1d2964',
                                                                    color: 'white'
                                                                }
                                                            }} onClick={() => handleCropNow(previewCanvasRef.current, imgRef.current)}>Crop and Save Now</Button>
                                                    </div>

                                                    {completedCrop && (
                                                        <canvas
                                                            ref={previewCanvasRef}
                                                            style={{
                                                                border: '1px solid black',
                                                                objectFit: 'contain',
                                                                width: 200,
                                                                height: 200,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </Dialog>
                                        )}

                                        {loggedInUserData?.data?.has_profile_pic === false ?
                                            < img onClick={handlePickImage} alt="profileImage" src={uploadVector} className="object-cover shadow-xl rounded-full h-44  w-44 align-middle border-none -m-12 -ml-20 lg:-ml-16 ml-20 hover:cursor-pointer" /> : < img onClick={handlePickImage} alt="profileImage" src={loggedInUserData?.data?.url} className="object-cover shadow-xl rounded-full h-44  w-44 align-middle border-none -m-12 -ml-20 lg:-ml-16 ml-20 hover:cursor-pointer" />
                                        }
                                        <input className="hidden" type="file" accept="image/png, image/gif, image/jpeg" name="image" onChange={onSelectFile} ref={inputForImage} multiple={false}></input>

                                    </div>
                                    <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div class="py-6 px-3 mt-32 sm:mt-0">
                                            <button class="bg-my-blue active:bg-my-yellow uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-md font-bold block uppercase tracking-wide text-my-blue">22</span><span className="text-xs text-blueGray-400">Friends</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-md font-bold block uppercase tracking-wide text-my-blue">10</span><span className="text-xs text-blueGray-400">Photos</span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-md font-bold block uppercase tracking-wide text-my-blue">89</span><span className="text-xs text-blueGray-400">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <div>
                                        <span className='flex flex-row align-center justify-center'>
                                            <h3 className="text-4xl font-semibold leading-normal text-my-yellow ">{loggedInUserData?.data?.user_name}</h3>
                                            <Tooltip title="Edit Profile">
                                                <Button onClick={handleEditProfile}><FiEdit className="text-[34px] bg-my-yellow text-my-blue p-2 rounded hover:cursor-pointer hover:bg-yellow-500 active:bg-yellow-400" /></Button>
                                            </Tooltip>
                                        </span>
                                    </div>

                                    <div className="text-sm leading-normal mt-0 mb-2 mt-2 text-blue-800 font-bold">

                                        {loggedInUserData?.data?.f_name} {loggedInUserData?.data?.l_name} <br />
                                        <p className='text-gray-400 font-[300] text-xs'>{loggedInUserData?.data?.email}</p>
                                    </div>
                                    <h6 className="text-lg font-semibold leading-normal text-black mb-2 mt-14">
                                        Profile Bio
                                    </h6>
                                    <div className="mb-2 text-sm text-gray-400">
                                        {loggedInUserData?.data?.profile_bio || <p className='text-red-600'>Sorry, No Bio Found!!</p>}
                                    </div>
                                </div>
                                <div class="mt-6 py-2 border-t border-blueGray-200 text-center">
                                    <div class="flex flex-wrap justify-center">
                                        <div class="w-full lg:w-[75vw] px-4">

                                            <MyImageCard
                                                imagesData={imagesData}
                                                refreshItemsData={refreshProfileImages}
                                                onClickImage={onClickImage}
                                                refreshProfileImages={refreshProfileImages}
                                            />
                                            <ViewMediaModel
                                                setOpen={setOpen}
                                                open={open}
                                                selectedMedia={selectedMedia}
                                            />
                                            <p class="font-normal text-sm text-my-blue mt-8 mb-4 hover:cursor-pointer">Show more</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                        <div class="container mx-auto px-4">
                            <div class="flex flex-wrap items-center md:justify-between justify-center">
                                <div class="w-full md:w-6/12 px-4 mx-auto text-center">
                                    <div class="text-sm text-blueGray-500 font-semibold py-1">
                                        {/* Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
                <EditProfileModel
                    openEditProfile={openEditProfile}
                    setOpenEditProfile={setOpenEditProfile}
                    setIsUserUpdated={setIsUserUpdated}
                />
            </div>
        </>
    )
}

export default Profile