import * as React from 'react';
import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography, MenuItem } from '@mui/material';
import { getUserDetails } from '../APIs/auth';
import { useDispatch } from 'react-redux';
import { isUserNameExist_API } from '../APIs/auth';
import { BsCheck2All } from 'react-icons/bs';
import { FaHandPointRight } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { updateRegisteredUser } from '../APIs/auth';
import { useAlert, types } from 'react-alert';




function EditProfileModel(props) {
    const { openEditProfile, setOpenEditProfile, setIsUserUpdated } = props;

    const initFormData = {
        user_name: '',
        f_name: '',
        l_name: '',
        email: '',
        profile_bio: ''
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
        }

    }
    const [formData, setFormData] = useState(initFormData);
    const [formDataError, setFormDataError] = useState(initFormDataError);
    const [isUserNameExist, setIsUserNameExist] = useState(null);
    const [isEmailChanged, setIsEmailChanged] = useState(false);

    



    const navigate = useNavigate();

    const alert = useAlert();

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getUserDetails({ token: token }, data => {
            if (data?.data?.status === 'ok') {
                setFormData(prev => ({
                    ...prev,
                    user_name: data?.data?.data?.user_name,
                    f_name: data?.data?.data?.f_name,
                    l_name: data?.data?.data?.l_name,
                    email: data?.data?.data?.email,
                    profile_bio: data?.data?.data?.profile_bio
                }));
            }
        }))
    }, [])


    const handleClose = () => {
        setOpenEditProfile(false);
        setIsUserNameExist(null);
    };

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

        }else if(name === 'email'){
            if(formData?.email === value){
                setIsEmailChanged(false);
            }else{
                setIsEmailChanged(true);
                setFormData(prev=>({
                    ...prev,
                    email:value
                }))
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    };

    const handleEditNow = () => {
        const payLoadFormData = new FormData();
        payLoadFormData.append('user_name', formData?.user_name)
        payLoadFormData.append('f_name', formData?.f_name);
        payLoadFormData.append('l_name', formData?.l_name)
        payLoadFormData.append('email', formData?.email);
        payLoadFormData.append('profile_bio', formData?.profile_bio);
        payLoadFormData.append('token', token);

        dispatch(updateRegisteredUser(payLoadFormData, data => {           
            if (data?.data?.okStatus === true) {
                alert.show(`Edited successfully`, { type: types.SUCCESS });
                setIsUserUpdated(state=>!state);
                if(isEmailChanged === true){
                    handleClose();
                    localStorage.removeItem("token");
                    localStorage.setItem("isLoggedIn", 'false');
                    navigate('/login')
                }else{
                    handleClose(); 
                }
                

            } else {
                alert.show("Sorry, something went wrong, try after sometime", { type: types.ERROR });
            }
        }))
    }


    return (
        <Dialog onClose={handleClose} open={openEditProfile}>
            <DialogTitle sx={{ fontWeight: 600 }}>Editing Profile</DialogTitle>
            <Grid container spacing={2} sx={{ marginTop: 1, bgcolor: "white", padding: 2, borderRadius: '10px', boxShadow: 2 }}>
                <Grid item xs={12}>
                    <TextField
                        helperText={formDataError?.user_name?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                        error={formDataError?.user_name?.errorMsg}
                        onChange={onChange} sx={{ width: '100%', }} value={formData?.user_name} name="user_name" label="User Name" variant="outlined" />
                    {isUserNameExist === true && <p className='text-red-600 text-xs text-left mt-1 flex flex-row'><RxCross2 className="text-red-600 text-lg mr-1" />Sorry, User name does not exist</p>}

                    {isUserNameExist === false && <p className='text-green-600 text-xs text-left mt-1 flex flex-row'><BsCheck2All className="text-red-600 text-lg mr-1" />Great, User name exist</p>}
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        helperText={formDataError?.f_name?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                        error={formDataError?.f_name?.errorMsg}
                        onChange={onChange} sx={{ width: '100%', }} value={formData?.f_name} name="f_name" label="First Name" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        helperText={formDataError?.l_name?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                        error={formDataError?.l_name?.errorMsg}
                        onChange={onChange} sx={{ width: '100%', }} value={formData?.l_name} name="l_name" label="Last Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        helperText={formDataError?.email?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                        error={formDataError?.email?.errorMsg}
                        onChange={onChange} sx={{ width: '100%', }} value={formData?.email} name="email" label="Email" variant="outlined" />
                        <span className='flex flex-row align-center mt-2'><FaHandPointRight className="text-lg text-blue-600 mr-2"/> <p className='text-xs text-blue-600 text-left '>If you change your email, you will automatically Log Out and then you will Log In again with your new Email.</p></span>
                       
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-flexible"
                        helperText={formDataError?.profile_bio?.errorMsg === true ? 'This Field is required, please fill this field' : null}
                        error={formDataError?.profile_bio?.errorMsg}
                        onChange={onChange} sx={{ width: '100%', }} value={formData?.profile_bio}
                        name="profile_bio"
                        label="Profile Bio"
                        multiline
                        maxRows={4}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        key={'edit now'}
                        sx={{
                            my: 1, color: 'white', bgcolor: '#344698',
                            textTransform: 'unset',
                            ':hover': {
                                bgcolor: '#314dbc',
                                color: 'white'
                            },
                            ':active': {
                                bgcolor: '#1d2964',
                                color: 'white'
                            }
                        }} onClick={() => handleEditNow()}>Edit Now</Button>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default EditProfileModel