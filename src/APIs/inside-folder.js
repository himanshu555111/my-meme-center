import axios from 'axios';

const INSIDEFOLDERDATA_URL = "http://localhost:5000/insideFolder";


const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  "Access-Control-Allow-Origin": "*",
}

export const getInsideFolderData = (data, callback) => {
  console.log(data, 'get item res')
  return async () => {
    axios.get(`${INSIDEFOLDERDATA_URL}/${data?.folderName}/${data?.itemId}`, {
      params: data
    }, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}

export const deleteInsideFolderData = (data, callback) => {
  console.log(data, 'delete item res')
  return async () => {
    axios.delete(`${INSIDEFOLDERDATA_URL}/${data?.folderName}/${data?.itemId}`, {
      params: data
    }, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}













