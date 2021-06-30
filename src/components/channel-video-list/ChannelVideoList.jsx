import React from 'react';
import styles from './ChannelVideoList.module.css';
import ChannelVideo from '../channel-video/ChannelVideo';

const ChannelVideoList = ({ channelVideos }) => {
    return (
        <div className={styles.channel__videos}>
            {channelVideos?.map((video) => {
                const {
                    contentDetails: { videoId },
                } = video;
                return <ChannelVideo video={video} key={videoId} />;
            })}
        </div>
    );
};

export default ChannelVideoList;
