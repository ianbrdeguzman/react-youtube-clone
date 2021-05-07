import axios from 'axios';
require('dotenv').config();

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: process.env.REACT_APP_YT_API_KEY,
    },
});

export default request;
