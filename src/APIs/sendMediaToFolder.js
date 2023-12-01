
import axios from 'axios';

const POSTMEDIATOFOLDER_URL = "http://localhost:8000/sendMediaToFolder";



export const postMediaToFolder = (data, callback) => {
  return async () => {
      axios.post(POSTMEDIATOFOLDER_URL, data).then(data => {    
           callback(data);
      })
  }
}