import React, { useEffect, useState } from 'react';
import styles from './RelatedVideo.module.css';
import moment from 'moment';
import numeral from 'numeral';
import request from './axios';
import { useHistory } from 'react-router-dom';

const RelatedVideo = ({ video }) => {
    const [duration, setDuration] = useState('');
    const [viewCount, setViewCount] = useState('');

    const history = useHistory();

    const { id } = video;

    const {
        channelTitle,
        publishedAt,
        thumbnails: {
            medium: { url },
        },
        title,
    } = video?.snippet;

    const videoId = id?.videoId || id;

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
        if (videoId) fetchVideoDetails();
    }, [videoId]);

    const handleOnClick = () => {
        history.push(`/watch/${videoId}`);
    };

    return (
        <article
            className={styles.relatedvideos__container__item}
            onClick={handleOnClick}
        >
            <div className={styles.relatedvideos__container__item__img}>
                <img src={url} alt={title} />
                <span>{formatDuration}</span>
            </div>
            <div>
                <h4>{title}</h4>
                <p>{channelTitle}</p>
                <p>
                    {numeral(viewCount).format('0.0a')} {' views • '}
                    {moment(publishedAt).fromNow()}
                </p>
            </div>
        </article>
    );
};

export default RelatedVideo;
