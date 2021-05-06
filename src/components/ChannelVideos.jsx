import React from 'react';
import styles from './styles/ChannelVideos.module.css';
import ChannelVideo from './ChannelVideo';

const ChannelVideos = ({ channelVideos }) => {
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

export default ChannelVideos;
