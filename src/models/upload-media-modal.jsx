import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';



const uploadOptions = [
    {
        optionName:'Upload Media',
        optionIcon:<FileUploadIcon/>
    },
    {
        optionName: 'Create and Upload Media',
        optionIcon:<CreateIcon/>
    } 
];

function UploadMediaModal(props) {
    const { onClose, selectedUploadOption, open } = props;
    const navigate = useNavigate();
    const handleClose = () => {
        onClose(selectedUploadOption);
    };
    const handleListItemClick = (value) => {
        if(value === "Upload Media"){
            navigate('/upload-media');
        }
        onClose(value);
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose an option to upload</DialogTitle>
            <List sx={{ pt: 0 }}>
                {uploadOptions.map((res) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(res?.optionName)} key={res?.optionName}>
                            <IconButton>
                                {res?.optionIcon}
                            </IconButton>
                            <ListItemText primary={res?.optionName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    )
}

export default UploadMediaModal