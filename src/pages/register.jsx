import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../APIs/auth';
import { useDispatch } from 'react-redux';
import { HiLightBulb } from 'react-icons/hi';
import { BsFillCameraFill } from 'react-icons/bs';
import { BsCheck2All } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useAlert, types } from 'react-alert';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
} from 'react-image-crop';
import { CanvasPreview } from '../models/canvas-preview';
import { UseDebounceEffect } from './useDebounceEffect';
import 'react-image-crop/dist/ReactCrop.css';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { isUserNameExist_API } from '../APIs/auth';
import { Button } from '@mui/material';
import uploadVector from '../assets/upload_vector.jpg';



function Register() {

   
    const initFormData = {
        user_name: "",
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    const onInputValidate = (value, name) => {
        setFormDataError(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
    }
    const initFormDataError = {
        user_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        f_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        l_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        email: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        password: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },

    }
    const [formData, setFormData] = useState(initFormData);
    const [formDataError, setFormDataError] = useState(initFormDataError);

    const [isUserNameExist, setIsUserNameExist] = useState(null);
    const [isPasswordMatched, setIsPasswordMatched] = useState(null);

    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [output, setOutput] = useState('');
    const [aspect, setAspect] = useState(16 / 16);
    const [open, setOpen] = useState(false);

  

    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const inputForImage = useRef(null);

    const alert = useAlert()

    const navigate = useNavigate();
    const dispatch = useDispatch();


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

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
                setOpen(true)
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
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


    const handlePickImage = () => {
        inputForImage.current.click();
    }

    const handleClose = () => {
        setOpen(false)
        setCrop();
        setCompletedCrop();
        setImgSrc('');
    }


    const alreadyHaveAccountClick = () => {
        navigate('/login');
    }


    const validateForm = () => {
        let isInvalid = false;
        Object.keys(formDataError).forEach(x => {
            const errObj = formDataError[x];
            if (errObj.errorMsg === true) {
                isInvalid = true;
            } else if (errObj.isReq && !formData[x]) {
                isInvalid = true;
                onInputValidate(true, x);
            }
        });
        return !isInvalid;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            console.error('Invalid Form!');
        } else if (formData?.password !== formData?.confirm_password) {
            setIsPasswordMatched(false);
        } else if (isUserNameExist === true) {
            console.error('user name already exist');
        } else {
           
            fetch(output).then(res => res.blob()).then(blob => {
                const formDataForProfileUpload = new FormData();
                const file = new File([blob], "profileImage.jpeg");
                console.log(file,'file')
                formDataForProfileUpload.append('image', file)
                formDataForProfileUpload.append('user_name', formData?.user_name);
                formDataForProfileUpload.append('f_name', formData?.f_name);
                formDataForProfileUpload.append('l_name', formData?.l_name);
                formDataForProfileUpload.append('email', formData?.email);
                formDataForProfileUpload.append('password', formData?.password);
                formDataForProfileUpload.append('has_cover_pic', false)
                if(output === '' || output === undefined){
                    formDataForProfileUpload.append('has_profile_pic', false)
                }else{
                    formDataForProfileUpload.append('has_profile_pic', true)
                }

                dispatch(registerUser(formDataForProfileUpload, data => {                  
                    if (data?.status === 200 && data?.data?.okStatus === true) {
                        alert.show(`Registered successfully`, { type: types.SUCCESS });
                        navigate('/login');
                        setFormData(initFormData);
                        setFormDataError(initFormDataError);
                    } else {
                        alert.show("Sorry, something went wrong, try after sometime", { type: types.ERROR });
                    }
                }))
            })

        }
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "user_name") {
            if (value === "") {
                setIsUserNameExist(null);
                setFormDataError(prev => ({
                    ...prev,
                    user_name: {
                        isReq: true,
                        errorMsg: '',
                        onValidateFunc: onInputValidate
                    }
                }))
                setFormData(state => ({
                    ...state,
                    user_name: value,
                }))
            } else {
                setFormDataError(prev => ({
                    ...prev,
                    user_name: {
                        isReq: true,
                        errorMsg: '',
                        onValidateFunc: onInputValidate
                    }
                }))
                setFormData(state => ({
                    ...state,
                    user_name: value,
                }))
                dispatch(isUserNameExist_API({ user_name: value }, data => {
                    if (data?.data?.isExist === false) {
                        setIsUserNameExist(false);
                    } else {
                        setIsUserNameExist(true);
                    }
                }))
            }

        } else if (name === "confirm_password") {
            setFormData(state => ({
                ...state,
                [name]: value
            }))
            if (formData?.password === value) {
                setIsPasswordMatched(true);
            } else {
                setIsPasswordMatched(false);
            }
        } else {
            setFormDataError(prev => ({
                ...prev,
                [name]: {
                    isReq: true,
                    errorMsg: '',
                    onValidateFunc: onInputValidate
                }
            }))
            setFormData(state => ({
                ...state,
                [name]: value
            }))
        }
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
        handleClose();
    }

    // console.log(crop)
    // console.log(output,'output')

    return (
        <>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div style={{ display: "flex", alignItems: "center" }} className="flex-col h-full g-6 text-gray-800">
                        <div className='w-fit'>
                            {!!imgSrc && (
                                <Dialog onClose={handleClose} open={open}>
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
                                                }} onClick={() => handleCropNow(previewCanvasRef.current, imgRef.current)}>Crop Now</Button>
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

                            <img alt="profileImage" src={output || uploadVector} className="object-cover shadow-xl rounded-full h-44 w-44 align-middle border-none mb-4" />
                            <BsFillCameraFill onClick={handlePickImage} className="absolute left-[52vw] top-44 w-10 h-10 p-2 bg-my-blue text-my-yellow rounded-full hover:cursor-pointer hover:bg-blue-800 active:bg-blue-600" />

                            <input className="hidden" type="file" accept="image/png, image/gif, image/jpeg" name="image" onChange={onSelectFile} ref={inputForImage} multiple={false}></input>
                        </div>

                        <div className="md:w-8/12 lg:w-5/12 ">
                            <form onSubmit={handleRegister}>
                                <p className='text-my-blue text-xs flex flex-row align-center'><HiLightBulb className=" mb-2 mr-1 text-my-blue text-lg" />User Name is strictly required, This will be unique name of your profile.</p>
                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="user_name"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="User Name"
                                    />

                                    {isUserNameExist === true && <p className='text-red-600 text-xs text-left mt-1 flex flex-row'><RxCross2 className="text-red-600 text-lg mr-1" />Sorry, User name does not exist</p>}

                                    {isUserNameExist === false && <p className='text-green-600 text-xs text-left mt-1 flex flex-row'><BsCheck2All className="text-red-600 text-lg mr-1" />Great, User name exist</p>}

                                    {formDataError?.user_name?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="f_name"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="First Name"
                                    />
                                    {formDataError?.f_name?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="l_name"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Last Name"
                                    />
                                    {formDataError?.l_name?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="email"
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                    {formDataError?.email?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>


                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="password"
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                    {formDataError?.password?.errorMsg ? <p className='text-red-600 text-xs text-left mt-1'>This Field is required</p> : null}
                                </div>

                                <div className="mb-6">
                                    <input
                                        onChange={onChange}
                                        name="confirm_password"
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Confirm Password"
                                    />
                                    {isPasswordMatched === true && <p className='text-red-600 text-xs flex flex-row text-left mt-1'> <BsCheck2All className="text-red-600 text-lg mr-1" />Password Matched</p>}
                                    {isPasswordMatched === false && <p className='text-red-600 text-xs flex flex-row text-left mt-1'><RxCross2 className="text-red-600 text-lg mr-1" />Password did not Matched</p>}

                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <button onClick={alreadyHaveAccountClick} className='text-blue-400 text-sm'>Already have an account, Sign in now</button>
                                </div>

                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Register Now
                                </button>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    style={{ "backgroundColor": "#3b5998" }}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Facebook --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        className="w-3.5 h-3.5 mr-2"
                                    >
                                        {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>Continue with Facebook</a>
                                <a
                                    className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                                    style={{ "backgroundColor": "#55acee" }}
                                    href="#!"
                                    role="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    {/* <!-- Twitter --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        className="w-3.5 h-3.5 mr-2"
                                    >
                                        {/* <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                        <path
                                            fill="currentColor"
                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                        /></svg>Continue with Twitter
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register