import React from 'react'
import { useState, useRef } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { uploadImageApiCall } from '../APIs/upload-image';
import { useAlert, types } from 'react-alert';
import { shadows } from '@mui/system';



function UploadImage() {
    const initialFormData = {
        image_name: '',
        is_veg: '',
        catagory: '',
        image_ext: ''
    }
    const onInputValidate = (value, name) => {
        setFormDataError(prev => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }));
    }
    const initFormDataError = {
        image_name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        is_veg: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        catagory: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        },
        image_ext: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate
        }
    }
    const [formData, setFormData] = useState(initialFormData);
    const [formDataError, setFormDataError] = useState(initFormDataError);
    const [fileInput, setFileInput] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const alert = useAlert();
    const inputForImage = useRef(null);
    
    const handleSelectFile = () => {
        inputForImage.current.click();
    }

    const handleFileChange = (e) => {
        const imageFile = e.target.files[0];
        setFileInput(imageFile);
        previewFile(imageFile);
    }

    const previewFile = (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
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

    const handleSubmitImage = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid || !fileInput) {
            console.error('Invalid Form!');
            return false;
        }
        const formDataForImageUpload = new FormData(); 
        formDataForImageUpload.append('image', fileInput);
        formDataForImageUpload.append('name', formData?.image_name);
        formDataForImageUpload.append('is_veg', formData?.is_veg);
        formDataForImageUpload.append('catagory', formData?.catagory);
        formDataForImageUpload.append('ext', formData?.image_ext);
        
        dispatch(uploadImageApiCall(formDataForImageUpload, data => {
            console.log('callback data of upload API', data)
            if (data?.status === 200) {
                setFormData(initialFormData);
                setImagePreview(null);
                alert.show('Image Uploaded', { type: types.SUCCESS });
            }
        }))
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }))
        setFormDataError(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                errorMsg: value
            }
        }));
    }

    console.log(formData)

    return (
        <>
            <Grid container spacing={2} sx={{ marginTop: 4, bgcolor: "white", padding: 2, borderRadius: '10px', boxShadow:2 }}>
                <Grid item xs={4}>
                    <CardMedia
                        component="img"
                        image={imagePreview === null ? "https://i.ibb.co/gJQRD50/Image-upload-rafiki.png" : imagePreview}
                        // https://i.ibb.co/QrwzjST/34.jpg
                        alt="uploading image"
                        sx={{ objectFit: 'cover', height: '330px', width: '500px', borderRadius: '10px', bgcolor: 'white' }}
                    />
                    <Button
                        onClick={handleSelectFile}
                        sx={{
                            bgcolor: '#fed800 ', color: '#263471', width: '100%', marginTop: 1,
                            ':hover': {
                                bgcolor: '#fed800', color: '#263471'
                            }
                        }}><AddCircleOutlineIcon sx={{ marginRight: 1 }} />Select Image</Button>
                    <input className="hidden" type="file" accept="image/png, image/gif, image/jpeg" name="image" onChange={handleFileChange} ref={inputForImage} multiple={false}></input>
                </Grid>
                <Grid item xs={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                helperText={formDataError?.image_name?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                                error={formDataError?.image_name?.errorMsg}
                                onChange={onChange} sx={{ width: '100%',  }} value={formData?.image_name} name="image_name" id="image-name" label="Name of Image" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                helperText={formDataError?.catagory?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                                error={formDataError?.catagory?.errorMsg}
                                onChange={onChange} value={formData?.catagory} sx={{ width: '100%',  }} name="catagory" select id="catagory" label="Select Catagory" variant="outlined" >
                                <MenuItem value={'bollywood'} key={'bollywood'}>
                                    <Typography textAlign="center">BollyWood</Typography>
                                </MenuItem>
                                <MenuItem value={'politics'} key={'politics'}>
                                    <Typography textAlign="center">Politics</Typography>
                                </MenuItem>
                                <MenuItem value={'corporate'} key={'corporate'}>
                                    <Typography textAlign="center">Corporate</Typography>
                                </MenuItem>
                                <MenuItem value={'gaming'} key={'gaming'}>
                                    <Typography textAlign="center">Gaming</Typography>
                                </MenuItem>
                                <MenuItem value={'schoolLife'} key={'schoolLife'}>
                                    <Typography textAlign="center">SchoolLife</Typography>
                                </MenuItem>
                                <MenuItem value={'hollyWood'} key={'hollyWood'}>
                                    <Typography textAlign="center">HollyWood</Typography>
                                </MenuItem>
                                <MenuItem value={'music'} key={'music'}>
                                    <Typography textAlign="center">Songs & Music</Typography>
                                </MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                helperText={formDataError?.is_veg?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                                error={formDataError?.is_veg?.errorMsg}
                                onChange={onChange} value={formData?.is_veg} sx={{ width: '100%',  }} name="is_veg" select id="image-ext" label="Veg or Non-Veg" variant="outlined">
                                <MenuItem value={'veg'} key={'veg'}>
                                    <Typography textAlign="center">Veg</Typography>
                                </MenuItem>
                                <MenuItem value={'non-veg'} key={'nonveg'}>
                                    <Typography textAlign="center">Non Veg</Typography>
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                helperText={formDataError?.image_ext?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                                error={formDataError?.image_ext?.errorMsg}
                                onChange={onChange} value={formData?.image_ext} sx={{ width: '100%',  }} name="image_ext" select id="image-ext" label="Select Extension" variant="outlined">
                                <MenuItem value={'jpeg'} key={'jpeg'}>
                                    <Typography textAlign="center">JPEG</Typography>
                                </MenuItem>
                                <MenuItem value={'png'} key={'png'}>
                                    <Typography textAlign="center">PNG</Typography>
                                </MenuItem>
                                <MenuItem value={'svg'} key={'svg'}>
                                    <Typography textAlign="center">SVG</Typography>
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={handleSubmitImage}
                                sx={{
                                    bgcolor: '#263471', color: 'white', width: '100%',
                                    ':hover': {
                                        bgcolor: '#263471e8', color: 'white'
                                    }
                                }}><UploadIcon sx={{ marginRight: 1 }} />Upload Now</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default UploadImage