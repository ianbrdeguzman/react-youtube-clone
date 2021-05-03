import axios from 'axios';

const request = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        key: 'AIzaSyBb9eDxertD0lV-gxR0x7wbdK58bWcN28Y', // from consolecloud
    },
});

export default request;
