import React, { useState, useEffect } from 'react';
import styles from './SearchVideo.module.css';
import moment from 'moment';
import numeral from 'numeral';
import request from './axios';

const SearchVideo = ({ video }) => {
    const [channelIcon, setChannelIcon] = useState('');

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
            resourceId,
        },
    } = video;

    const videoId = id?.videoId || id;

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

    return (
        <article className={styles.search__video}>
            <div className={styles.search__video__header}>
                <img src={url} alt={title} />
                <span>10:10</span>
            </div>
            <div className={styles.search__video__info}>
                <h4>{title}</h4>
                <p>618k views • {moment(publishedAt).fromNow()}</p>
                <div>
                    <img src={channelIcon} alt={channelTitle} />
                    <p>{channelTitle}</p>
                </div>
                <p>{description}</p>
            </div>
        </article>
    );
};

export default SearchVideo;
