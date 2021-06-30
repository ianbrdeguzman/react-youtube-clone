import React, { useState, useEffect } from 'react';
import styles from './SearchVideo.module.css';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import request from './../shared/axios';
import SearchVideoButton from '../search-video-button/SearchVideoButton';

const SearchVideo = ({ video }) => {
    const [channelIcon, setChannelIcon] = useState('');
    const [duration, setDuration] = useState('');
    const [viewCount, setViewCount] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');
    const [videoCount, setVideoCount] = useState('');

    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            publishedAt,
            thumbnails: {
                medium: { url },
            },
            title,
        },
    } = video;

    const isVideo = !(id.kind === 'youtube#channel');

    const videoId = id?.videoId || id;

    const seconds = moment.duration(duration).asSeconds();
    const formatDuration = moment.utc(seconds * 1000).format('mm:ss');

    const history = useHistory();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: videoId,
                },
            });
            setDuration(items[0].contentDetails.duration);
            setViewCount(items[0].statistics.viewCount);
        };
        if (isVideo) fetchVideoDetails();
    }, [videoId, isVideo]);

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
                setChannelIcon(items[0].snippet.thumbnails.default.url);
                setSubscriberCount(items[0].statistics.subscriberCount);
                setVideoCount(items[0].statistics.videoCount);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchChannelDetails(channelId);
    }, [channelId]);

    const handleOnClick = () => {
        !isVideo
            ? history.push(`/channel/${channelId}`)
            : history.push(`/watch/${videoId}`);
    };

    return (
        <article
            className={isVideo ? styles.search__video : styles.search__channel}
        >
            <div
                className={
                    isVideo
                        ? styles.search__video__header
                        : styles.search__channel__header
                }
                onClick={handleOnClick}
            >
                <img src={url} alt={title} />
                {isVideo && <span>{formatDuration}</span>}
            </div>
            <div
                className={
                    isVideo
                        ? styles.search__video__info
                        : styles.search__channel__info
                }
                onClick={handleOnClick}
            >
                <h4>{title}</h4>
                {isVideo ? (
                    <p>
                        {numeral(viewCount).format('0.0a')}
                        {' views • '}
                        {moment(publishedAt).fromNow()}
                    </p>
                ) : (
                    <p>
                        {numeral(subscriberCount).format('0.0a')}
                        {' subscribers • '}
                        {numeral(videoCount).format('0,0')}
                        {' videos'}
                    </p>
                )}

                {isVideo && (
                    <div>
                        <img src={channelIcon} alt={channelTitle} />
                        <p>{channelTitle}</p>
                    </div>
                )}
                <p>{description}</p>
            </div>
            {!isVideo && <SearchVideoButton channelId={channelId} />}
        </article>
    );
};

export default SearchVideo;
