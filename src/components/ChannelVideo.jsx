import React, { useState, useEffect } from 'react';
import styles from './ChannelVideo.module.css';
import moment from 'moment';
import numeral from 'numeral';
import request from './axios';
import { useHistory } from 'react-router-dom';

const ChannelVideo = ({ video }) => {
    const [duration, setDuration] = useState('');
    const [viewCount, setViewCount] = useState('');

    const {
        contentDetails: { videoId, videoPublishedAt },
        snippet: {
            channelTitle,
            thumbnails: {
                medium: { url },
            },
            title,
        },
    } = video;

    const history = useHistory();

    const seconds = moment.duration(duration).asSeconds();
    const formatDuration = moment.utc(seconds * 1000).format('mm:ss');

    useEffect(() => {
        console.log('fetching video details...');
        const fetchVideoDetails = async (id) => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: id,
                },
            });
            setDuration(items[0].contentDetails.duration);
            setViewCount(items[0].statistics.viewCount);
        };
        if (videoId) fetchVideoDetails(videoId);
    }, [videoId]);

    const handleOnClick = () => {
        history.push(`/watch/${videoId}`);
    };

    return (
        <div
            className={styles.channel__videos__item}
            key={videoId}
            onClick={handleOnClick}
        >
            <div>
                <img src={url} alt={title} />
                <span>{formatDuration}</span>
            </div>
            <h4>{title}</h4>
            <p>{channelTitle}</p>
            <p>
                {numeral(viewCount).format('0.0a')}
                {' views • '}
                {moment(videoPublishedAt).fromNow()}
            </p>
        </div>
    );
};

export default ChannelVideo;
