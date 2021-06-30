import React, { useState, useEffect } from 'react';
import styles from './ChannelPlaylist.module.css';
import { useParams } from 'react-router-dom';
import { MdPlaylistPlay } from 'react-icons/md';
import request from '../shared/axios';

const ChannelPlaylist = () => {
    const { channelId } = useParams();
    const [playlistVideos, setPlaylistVideos] = useState([]);

    useEffect(() => {
        const fetchPlaylistVideos = async (id) => {
            try {
                const {
                    data: { items },
                } = await request('/playlists', {
                    params: {
                        part: 'snippet,contentDetails',
                        channelId: id,
                        maxResults: 20,
                    },
                });
                setPlaylistVideos(items);
            } catch (error) {
                console.log(error);
            }
        };
        if (channelId) fetchPlaylistVideos(channelId);
    }, [channelId]);

    const handleOnClick = () => {
        alert('Not yet implemented...');
    };
    return (
        <div className={styles.channel__playlist}>
            {playlistVideos?.map((video) => {
                const {
                    contentDetails: { itemCount },
                    snippet: {
                        thumbnails: {
                            medium: { url },
                        },
                        title,
                    },
                } = video;
                return (
                    <div
                        className={styles.channel__playlist__item}
                        key={video.id}
                        onClick={handleOnClick}
                    >
                        <div>
                            <img src={url} alt={title} />
                            <span>
                                <p>{itemCount}</p>
                                <MdPlaylistPlay />
                            </span>
                        </div>
                        <h4>{title}</h4>
                        <p>VIEW PLAYLIST</p>
                    </div>
                );
            })}
        </div>
    );
};

export default ChannelPlaylist;
