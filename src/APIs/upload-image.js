import axios from 'axios';

const UPLOADIMAGE_URL = "http://localhost:5000/uploadImage";


const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export const uploadImageApiCall = (data, callback) => {
    // console.log(data,'558')

    return async () => {
        axios.post(UPLOADIMAGE_URL, data, config).then(data => {    
             callback(data);
        })
    }
}