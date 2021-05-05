import React, { useState, useEffect } from 'react';
import styles from './SubscriptionsVideo.module.css';
import { useHistory } from 'react-router-dom';
import request from './axios';
import numeral from 'numeral';

const SubscriptionsVideo = ({ channel }) => {
    const [subscriberCount, setSubscriberCount] = useState('');
    const [videoCount, setVideoCount] = useState('');

    const {
        snippet: {
            resourceId: { channelId },
            description,
            thumbnails: {
                medium: { url },
            },
            title,
        },
    } = channel;

    const history = useHistory();

    const handleOnChannelClick = () => {
        history.push(`/channel/${channelId}`);
    };

    const handleUnsubscribeClick = () => {
        alert('Not yet implemented');
    };

    useEffect(() => {
        const fetchChannelDetails = async (id) => {
            try {
                const {
                    data: { items },
                } = await request('/channels', {
                    params: {
                        part: 'snippet,statistics',
                        id: id,
                    },
                });
                setSubscriberCount(items[0].statistics.subscriberCount);
                setVideoCount(items[0].statistics.videoCount);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchChannelDetails(channelId);
    }, [channelId]);

    return (
        <div className={styles.subscription__channel}>
            <img src={url} alt={title} onClick={handleOnChannelClick} />
            <div onClick={handleOnChannelClick}>
                <h4>{title}</h4>
                <p>
                    {numeral(subscriberCount).format('0.0a')}
                    {' subscribers • '}
                    {numeral(videoCount).format('0,0')} videos
                </p>
                <p>{description}</p>
            </div>
            <button onClick={handleUnsubscribeClick}>SUBSCRIBED</button>
        </div>
    );
};

export default SubscriptionsVideo;
