import axios from 'axios';

const IMAGESDATA_URL = "http://localhost:8000/images";

const IMAGESBYCATDATA_URL = "http://localhost:8000/imagesByCategory";

const SEARCHIMAGES_URL = "http://localhost:8000/searchImages";




export const getImagesData = (data, callback) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
  return async () => {
    axios.get(`${IMAGESDATA_URL}/${data?.isVeg}`, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}

export const getImagesByCatData = (data, callback) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
  return async () => {
    axios.get(`${IMAGESBYCATDATA_URL}/${data?.cat}/${data?.isVeg}`, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}


export const getSearchImages = (data, callback) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
  return async () => {
    axios.get(`${SEARCHIMAGES_URL}/${data?.searchKeyword}/${data?.isVeg}`, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}




export const deleteImage = (data, callback) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
  return async () => {
    axios.delete(`${IMAGESDATA_URL}/${data?.itemId}`, {
      params: data
    }, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}