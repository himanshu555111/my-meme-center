import axios from 'axios';

const REGISTER_URL = "http://localhost:5000/register";
const LOGIN_URL = "http://localhost:5000/login";
const USERDETAILS_URL = "http://localhost:5000/userDetails";
const ISUSERNAMEEXIST_URL = "http://localhost:5000/isUserNameExist";





export const registerUser = (data, callback) => {
    return async () => {
        axios.post(REGISTER_URL, data).then(data => {    
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




