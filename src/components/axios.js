import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: 'AIzaSyALlhytq5R0kRyoay1assTjYKOB_3UJHwU',
    },
});

export default request;
