import React from 'react'
import { useEffect, useState } from 'react';
import { AiFillFolderAdd } from "react-icons/ai";
import { MdOutlineLiveHelp } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Folders from '../components/folders';
import { getFolders, postFolders, putFolders } from '../APIs/folders';

function MyDownloads() {

    const [formData, setFormData] = React.useState({
        folderName: "",
        folderDescription: "",
        folderID: ""
    })
    const [formDataError, setFormDataError] = React.useState({
        folderNameError: "",
        folderDescriptionError: ""
    })
    const [foldersArray, setFoldersArray] = React.useState([]);
    const [isFolderAvailable, setIsFolderAvailable] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [previousName, setPreviousName] = useState({
        name:'',
        description:''
    });



    const dispatch = useDispatch();

    const createFolderFunction = () => {
        handleClickOpen();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(state => ({
            ...state,
            folderName: "",

            folderDescription: ""
        }))
        // setFormDataError(state => ({
        //     ...state,
        //     folderNameError: ""
        // }))
    };

    const createNowFunction = () => {
     
        if (formData?.folderID) {
            dispatch(putFolders({ param: previousName?.name, bodyData: { name: formData?.folderName, description: formData?.folderDescription } }, data => {
                if (data?.status === 200) {
                    fetchFolders();
                    handleClose();
                } else {
                    alert('technical issue in update folders, try after some time')
                }
            }));
        } else {
            if (formData?.folderName) {
                // setFoldersArray(previousArray => ([
                //     ...previousArray,
                //     {
                //         folderName: formData?.folderName,
                //         folderDescription: formData?.folderDescription
                //     }
                // ]))
                dispatch(postFolders(
                    {
                        name: formData?.folderName,
                        description: formData?.folderDescription
                    },
                    data => {
                        if (data?.data === "folder created" || data?.status === 200) {
                            fetchFolders();                           
                        }
                    }
                ));
                setFormData(state => ({
                    ...state,
                    folderName: "",
                    folderDescription: ""
                }));
                setFormDataError(state => ({
                    ...state,
                    folderNameError: ""
                }))
                setOpen(false);
            } else {
                setFormDataError(state => ({
                    ...state,
                    folderNameError: "This field is Required"
                }))
            }
        }

    };


    const onChange = (e) => {
        const newFormData = { ...formData };
        const { name, value } = e.target;
        newFormData[name] = value;
        // console.log(newFormData, '002')
        setFormData(newFormData);
    }

    useEffect(() => {
        fetchFolders();
    }, [])

    const fetchFolders = () => {
        dispatch(getFolders({}, data => {
            if (data?.status === 200 && data?.data?.length >= 1) {
                setFoldersArray(data?.data);
                setIsFolderAvailable(true);
                setFormData(state=>({
                    ...state,
                    folderName:'',
                    folderDescription:'',
                    folderID:''
                }))
            } else {
                setIsFolderAvailable(false);
            }
        }));
    }

    console.log(formData?.folderName, 'formData?.folderName')

    return (
        <>
            <div className='w-full h-10 bg-gray-100 flex items-center mb-5'>
                <p className='text-left text-xs text-my-blue ml-5 flex flex-row '><MdOutlineLiveHelp className=' mr-1 text-sm' />Double click to open folder.</p>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='text-my-blue'>Creating Folder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hey <b className='text-my-blue'>Himanshu</b>, Now you can save your images and video in saparate folders, and just download them whenever you need.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        name="folderName"
                        value={formData?.folderName}
                        helperText={formDataError?.folderNameError}
                        error={!isFolderAvailable}
                        margin="dense"
                        id="foldername"
                        label="Folder Name"
                        placeholder="Folder Name"
                        fullWidth
                        onChange={onChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createNowFunction();
                            }
                        }}
                    />
                    <TextField
                        value={formData?.folderDescription}
                        margin="dense"
                        id="description"
                        label="Description for this Folder"
                        placeholder="Description for this Folder"
                        name="folderDescription"
                        fullWidth
                        onChange={onChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createNowFunction();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button sx={{
                        color: "#fff",
                        backgroundColor: "#263571",
                        "&:hover": {
                            backgroundColor: "#34499e",
                            color: "#fff",
                        }
                    }} onClick={createNowFunction}
                    >{formData?.folderID ? 'Edit Now' : 'Create Now'}</Button>
                </DialogActions>
            </Dialog>

            {isFolderAvailable ?
                <Folders
                    folders={foldersArray}
                    setOpen={setOpen}
                    setFormData={setFormData}
                    fetchFolders={fetchFolders}
                    setPreviousName={setPreviousName}
                /> :
                <div className="bg-white w-full h-full fixed items-center justify-center flex" >
                    <div>
                        <p className='text-red-500 text-sm text-left mb-2'>You do'nt have any folder, Please create a folder.</p>
                        <div className="bg-white drop-shadow-2xl w-[28rem] h-[28rem] rounded-lg mb-20 mr-40 items-center justify-center flex" >
                            <div>
                                <div className='flex flex-row'>
                                    <Tooltip title="Create Folder" arrow>
                                        <div onClick={createFolderFunction} className=" bg-gray-100 w-40 h-40 rounded-lg flex items-center justify-center active:bg-gray-200 hover:drop-shadow-lg hover:cursor-pointer" >
                                            <p className='text-[30px] text-my-blue'><AiFillFolderAdd /></p>
                                        </div>
                                    </Tooltip>
                                    <div className=" ml-5 border-dotted border-4 border-gray-100 w-40 h-40 rounded-lg flex items-center justify-center" >
                                    </div>
                                </div>
                                <div className='flex flex-row mt-5'>
                                    <div className=" border-dotted border-4 border-gray-100 w-40 h-40 rounded-lg flex items-center justify-center" >
                                    </div>
                                    <div className=" ml-5 border-dotted border-4 border-gray-100 w-40 h-40 rounded-lg flex items-center justify-center" >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default MyDownloads