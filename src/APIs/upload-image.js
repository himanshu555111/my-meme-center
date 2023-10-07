import axios from 'axios';

const UPLOADIMAGE_URL = "http://localhost:5000/uploadImage";


const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export const uploadImageApiCall = (data, callback) => {
    return async () => {
        axios.post(UPLOADIMAGE_URL, data, config).then(data => {    
             callback(data);
        })
    }
}