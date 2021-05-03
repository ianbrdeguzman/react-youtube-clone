import React from 'react';
import styles from './ChannelVideos.module.css';
import ChannelVideo from './ChannelVideo';
import moment from 'moment';
import numeral from 'numeral';

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
