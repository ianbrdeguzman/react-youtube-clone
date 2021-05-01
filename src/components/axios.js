import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        // key: 'AIzaSyALlhytq5R0kRyoay1assTjYKOB_3UJHwU', ianbrdeguzman
        // key: 'AIzaSyBjWh7Cri9DDyC2ROvUato105hKUv9fhWk', goodguycustoms
        // key: 'AIzaSyCf-UICFsRT7L54fW7ByhmttZTKKCBxRDQ', apicallsonly
        key: 'AIzaSyDGtBb4Hyhv27zJUsd144LUOVmU4VC03jI',
    },
});

export default request;
