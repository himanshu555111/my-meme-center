import React, { useMemo } from 'react'
import { AiFillFolder, AiOutlineFolderAdd, AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, } from "@mui/material";
import { sizeHeight } from '@mui/system';
import { deleteFolders, putFolders, putFoldersDesc } from '../APIs/folders';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {set_folder_param_id} from '../redux/features/folder-slice';


function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback('clickedOutside');
                //   return true;
            }
        }
        document.addEventListener("mousedown", handleClickOutside);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


function Folders(props) {

    const initialFormData = {
        name: undefined,
        description: undefined
    }

    const [formData, setFormData] = useState(initialFormData);
    const [isRename, setIsRename] = useState({ folderName: null, folderDes: null, folderID: null });
    const [previousFolderName, setPreviousFolderName] = useState(null);
    const [previousDescName, setPreviousDescName] = useState(null);



    const wrapperRef = useRef(null);

    const descRef = useRef(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const addNewFolderFunction = () => {
        props.setOpen(true)
    }

    const folderNameDoubleClick = (resName) => {
        setIsRename(state => ({
            ...state,
            folderName: resName
        }))
        setFormData(state => ({
            ...state,
            name: resName
        }))
        setPreviousFolderName(resName);
    }

    const folderDesDoubleClick = (resDes, resId) => {
        setIsRename(state => ({
            ...state,
            folderDes: resDes,
            folderID: resId
        }))
        setFormData(state => ({
            ...state,
            description: resDes
        }))
        setPreviousDescName(resDes);
    }


    useOutsideAlerter(wrapperRef, callbackData => {
        setIsRename(state => ({
            ...state,
            folderName: callbackData
        }));
    });

    useOutsideAlerter(descRef, callbackData => {
        setIsRename(state => ({
            ...state,
            folderDes: callbackData
        }));
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData };
        newFormData[name] = value;
        setFormData(newFormData);
    }

    useEffect(()=>{
        const folderData = props?.folders;
       
        // setFormData(state=>({
        //     ...state,
        //     name:folderData[0]?.name,
        //     description:folderData[0]?.description
        // }));       
       
    },[])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (formData?.name === null || formData?.name === undefined || formData?.name === " ") {

            } else {
                dispatch(putFolders({ param: previousFolderName, bodyData: { name: formData?.name } }, data => {
                    if (data?.status === 200) {
                        props?.fetchFolders();
                        setIsRename(state => ({
                            ...state,
                            folderName: "clickedOutside"
                        }));
                    } else {
                        alert('technical issue in update folders, try after some time')
                    }
                }));
            }
        }
    }

     const handleDescKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (formData?.description === null || formData?.description === undefined || formData?.description === " ") {

            } else {
                dispatch(putFoldersDesc({ param: previousDescName, bodyData: { description: formData?.description } }, data => {
                    if (data?.status === 200) {
                        props?.fetchFolders();
                        setIsRename(state => ({
                            ...state,
                            folderDes: "clickedOutside"
                        }));
                    } else {
                        alert('technical issue in update folders, try after some time')
                    }
                }));
            }
        }
     }

    useMemo(() => {
        if (isRename?.folderName === "clickedOutside") {
            // console.log(formData?.name, '7745')
            if (formData?.name === null || formData?.name === undefined || formData?.name === " ") {

            } else {
                dispatch(putFolders({ param: previousFolderName, bodyData: { name: formData?.name } }, data => {
                    if (data?.status === 200) {
                        props?.fetchFolders();
                    } else {
                        alert('technical issue in update folders, try after some time')
                    }
                }));
            }
        }
    }, [isRename?.folderName])

    useMemo(() => {
        if (isRename?.folderDes === "clickedOutside") {
            // console.log(formData?.description, '0012')
            // console.log(previousDescName, '0013')
            if (formData?.description === null || formData?.description === undefined || formData?.description === " ") {

            } else {
                dispatch(putFoldersDesc({ param: previousDescName, bodyData: { description:formData?.description } }, data => {
                    if (data?.status === 200) {
                        props?.fetchFolders();
                    } else {
                        alert('technical issue in update folders, try after some time')
                    }
                }));
            }
        }
    }, [isRename?.folderDes])

    const folderClick = (foldName) => {
        dispatch(set_folder_param_id(foldName));
        navigate(`/mydashboard/mydownloads/${foldName}`);
    }
    // console.log(previousDescName,'previousDescName');
    console.log(formData?.description, '003')


    return (
        <>
        {/* max-w-screen-lg */}
            <div className='flex flex-row flex-wrap'>
                {
                    props?.folders?.map((res, index) => (                        
                        <div key={res?._id} className='mb-6'>
                            <div className={`flex items-center ml-5`}>
                                <Tooltip title={res?.name} arrow>
                                    <div onClick={()=>folderClick(res?.name)} onDoubleClick={() => folderNameDoubleClick(res?.name)} className="bg-white border-solid border-2 border-gray-200 p-2 rounded-lg w-fit flex items-center justify-left hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200" >
                                        <div>
                                            <div className='flex'>
                                                <AiFillFolder className='text-[24px] mr-1 text-my-yellow' />
                                                {isRename?.folderName === res?.name ? <input onKeyDown={handleKeyDown} ref={wrapperRef} onChange={onChange} type="text" name="name" value={formData?.name} placeholder='rename folder' className='p-1' />
                                                    : <p className='text-sm text-my-blue mt-1 text-left'>{res?.name}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </Tooltip>
                                <Tooltip title={`Delete - ${res?.name}`} arrow>
                                    <div onClick={() => {
                                        dispatch(deleteFolders(res?.name, data => {
                                            if (data?.status === 200) {
                                                props.fetchFolders();
                                            }
                                        }))

                                    }
                                    } className='bg-gray-100 p-2 w-fit rounded-lg ml-2 flex items-center justify-left hover:bg-gray-300 hover:cursor-pointer active:bg-gray-200'><MdDelete /></div>
                                </Tooltip>
                                <Tooltip title={`Edit - ${res?.name}`} arrow>
                                    <div onClick={() => {
                                        props.setOpen(true);   
                                        props?.setFormData(state=>({
                                            ...state,
                                            folderName:res?.name,
                                            folderDescription:res?.description,
                                            folderID:res?._id
                                        }))      
                                        props?.setPreviousName(state=>({
                                            ...state,
                                            name:res?.name,
                                            description:res?.description
                                        }))                              
                                    }
                                    } className='bg-gray-100 p-2 w-fit rounded-lg ml-2 flex items-center justify-left hover:bg-gray-300 hover:cursor-pointer active:bg-gray-200'><AiFillEdit /></div>
                                </Tooltip>
                            </div>
                           {isRename?.folderDes === res?.description ? <input onKeyDown={handleDescKeyDown} ref={descRef} onChange={onChange} type="text" name="description" value={formData?.description} placeholder='rename description' className='p-1'></input> : <p onDoubleClick={() => { folderDesDoubleClick(res?.description, res?._id) }} className='text-xs text-gray-300 mt-1 text-left ml-5 hover:text-my-blue hover:cursor-pointer'>{res?.description}</p>
                           }
                           {/* {( (formData?.description === res?.description && isRename?.folderID === res?._id) && (formData?.description === '' ) && (isRename?.folderDes !== res?.description)) && <AiOutlinePlusSquare/>} */}
                        </div>  
                    ))
                }
                <Tooltip title={'Add New Folder'} arrow>
                    <IconButton
                        onClick={addNewFolderFunction}
                        sx={{
                            marginLeft: 5,
                            height: "fit-content"
                        }}>
                        <AiOutlineFolderAdd className='text-[25px] text-my-blue' />
                    </IconButton>
                </Tooltip>
            </div>


        </>
    )
}

export default Folders

