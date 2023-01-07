import axios from 'axios';

const GETVEGIMAGESDATA_URL = "http://localhost:5000/vegImages";



export const getVegImagesData = (data, callback) => {
    // console.log(data,'0000')   

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
      }
    return async () => {
        axios.get(`${GETVEGIMAGESDATA_URL}`,data,{
            headers: headers
          }).then(data => {    
             callback(data);
        })
    }
}