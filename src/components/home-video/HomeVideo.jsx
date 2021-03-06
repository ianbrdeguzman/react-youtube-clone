import React, { useEffect, useState } from 'react';
import styles from './HomeVideo.module.css';
import numeral from 'numeral';
import moment from 'moment';
import request from '../../helpers/axios';
import { useHistory } from 'react-router-dom';

const HomeVideo = ({ video }) => {
    const [channelIcon, setChannelIcon] = useState('');
    const [duration, setDuration] = useState('');
    const [viewCount, setViewCount] = useState('');

    const history = useHistory();

    const {
        id,
        snippet: {
            title,
            publishedAt,
            channelTitle,
            thumbnails: {
                medium: { url },
            },
            channelId,
        },
        contentDetails,
    } = video;

    const videoId = id?.videoId || contentDetails?.videoId || id;

    const seconds = moment.duration(duration).asSeconds();
    const formatDuration = moment.utc(seconds * 1000).format('mm:ss');

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
        fetchVideoDetails();
    }, [videoId]);

    useEffect(() => {
        const fetchChannelIcon = async (id) => {
            try {
                const {
                    data: { items },
                } = await request('/channels', {
                    params: {
                        part: 'snippet',
                        id: id,
                    },
                });
                setChannelIcon(items[0].snippet.thumbnails.default.url);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchChannelIcon(channelId);
    }, [channelId]);

    const handleVideoOnClick = () => {
        history.push(`/watch/${videoId}`);
    };

    const handleChannelOnClick = () => {
        history.push(`/channel/${channelId}`);
    };

    return (
        <>
            <article className={styles.video}>
                <div
                    className={styles.video__header}
                    onClick={handleVideoOnClick}
                >
                    <img src={url} alt={title} />
                    <span>{formatDuration}</span>
                </div>
                <div className={styles.video__content}>
                    <div onClick={handleVideoOnClick}>
                        <img src={channelIcon} alt={channelTitle} />
                        <h4>{title}</h4>
                    </div>
                    <div>
                        <p onClick={handleChannelOnClick}>{channelTitle}</p>
                        <p>
                            {numeral(viewCount).format('0.0a')} {'views ??? '}
                            {moment(publishedAt).fromNow()}
                        </p>
                    </div>
                </div>
            </article>
        </>
    );
};

export default HomeVideo;
