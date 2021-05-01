import React, { useContext } from 'react';
import styles from './ChannelPage.module.css';
import { useParams } from 'react-router-dom';
import { AppContext } from '../components/Context';

const ChannelPage = () => {
    const { channelId } = useParams();
    const { fetchChannelDetails } = useContext(AppContext);

    return (
        <div className={styles.container}>
            <img
                src='https://yt3.ggpht.com/ytc/AAUvwngXVUOK3DI8g8BHFPtX7Gei9nok-D7yPAkUAo33=s88-c-k-c0x00ffffff-no-rj'
                alt=''
            />
            <div>
                <h1>Channel Title</h1>
                <p>10K subsribers</p>
            </div>
            <button>SUBSCRIBE</button>
        </div>
    );
};

export default ChannelPage;
