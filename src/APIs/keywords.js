import axios from 'axios';

const KEYWORDS_URL = "http://localhost:8000/keywords";




export const getAvailableKeywordsData = (data, callback) => {
  const headers = {
    
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
  return async () => {
    axios.get(`${KEYWORDS_URL}/${data?.keyword}`, {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}


export const postKeyword = (data, callback) => {
  const headers = {
    
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }
  return async () => {
    axios.post(KEYWORDS_URL, data,  {
      headers: headers
    }).then(data => {
      callback(data);
    })
  }
}



