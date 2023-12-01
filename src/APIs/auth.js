import axios from 'axios';

const REGISTER_URL = "http://localhost:8000/register";
const LOGIN_URL = "http://localhost:8000/login";
const USERDETAILS_URL = "http://localhost:8000/userDetails";
const ISUSERNAMEEXIST_URL = "http://localhost:8000/isUserNameExist";


const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}

export const registerUser = (data, callback) => {
    return async () => {
        axios.post(REGISTER_URL, data, config).then(data => {    
             callback(data);
        })
    }
}

export const updateRegisteredUser = (data, callback) => {
    return async () => {
        axios.put(REGISTER_URL, data, config).then(data => {    
             callback(data);
        })
    }
}

export const loginUser = (data, callback) => {
    return async () => {
        axios.post(LOGIN_URL, data).then(data => {    
             callback(data);
        })
    }
}

export const getUserDetails = (data, callback) => {
    return async () => {
        axios.post(USERDETAILS_URL, data).then(data => {    
             callback(data);
        })
    }
}

export const isUserNameExist_API = (data, callback) => {
    return async () => {
        axios.post(ISUSERNAMEEXIST_URL, data).then(data => {    
             callback(data);
        })
    }
}




