import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: 'AIzaSyALlhytq5R0kRyoay1assTjYKOB_3UJHwU',
        //key: 'AIzaSyBjWh7Cri9DDyC2ROvUato105hKUv9fhWk',
    },
});

export default request;
