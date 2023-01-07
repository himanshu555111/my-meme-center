import axios from 'axios';

const GETFOLDERS_URL = "http://localhost:5000/folder";
const POSTFOLDERS_URL = "http://localhost:5000/folder";
const DELETEFOLDER_URL = "http://localhost:5000/folder";
const UPDATEFOLDER_URL = "http://localhost:5000/folder";
const UPDATEFOLDERDESC_URL = "http://localhost:5000/folderDescription";


export const getFolders = (params, callback) => {
    return async () => {
        axios.get(GETFOLDERS_URL).then(data => {    
             callback(data);
        })
    }
}

export const postFolders = (data, callback) => {
    return async () => {
        axios.post(POSTFOLDERS_URL, data).then(data => {    
             callback(data);
        })
    }
}

export const deleteFolders = (data, callback) => {
    return async () => {
        axios.delete(`${DELETEFOLDER_URL}/${data}`).then(data => {    
             callback(data);
        })
    }
}


export const putFolders = (data, callback) => {
    return async () => {
        axios.put(`${UPDATEFOLDER_URL}/${data?.param}`, data?.bodyData).then(data => {    
             callback(data);
        })
    }
}

export const putFoldersDesc = (data, callback) => {
    return async () => {
        axios.put(`${UPDATEFOLDERDESC_URL}/${data?.param}`, data?.bodyData).then(data => {    
             callback(data);
        })
    }
}



