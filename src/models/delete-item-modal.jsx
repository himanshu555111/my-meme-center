import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:2
};

function DeleteItemModal(props) {
    

    return (
        <>
            <Modal
                open={props?.openModal}
                onClose={props?.handleDeleteModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{color:'black'}} id="modal-modal-title" variant="h6" component="h2">
                        {props?.head}
                    </Typography>
                    <div className='flex flex-row'>
                        <Button
                            key={'deletenow'}
                            onClick={()=>props?.deleteDataOnClick(props?.itemRes)}
                            sx={{
                                mx:2, my:2, color: 'white', bgcolor:'#344698', display: 'block', marginLeft: 0,
                                textTransform: 'unset',
                                ':hover':{
                                    bgcolor:'#314dbc',
                                    color: 'white'
                                }, 
                                ':active':{
                                    bgcolor:'#1d2964',
                                    color: 'white'
                                }                               
                            }}
                        >
                            {'Delete Now'}
                        </Button>
                        <Button
                            key={'cancel'}
                            onClick={()=>props?.handleDeleteModalClose()}
                            sx={{
                                my:2, color: 'black', bgcolor:'#e1e1e1', display: 'block', textTransform: 'unset'                               
                            }}
                        >
                            {'Cancel'}
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default DeleteItemModal