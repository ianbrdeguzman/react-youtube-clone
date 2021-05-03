import React, { useContext, useState, useEffect } from 'react';
import styles from './ChannelPage.module.css';
import { useParams } from 'react-router-dom';
import { AppContext } from '../components/context';
import ChannelVideos from '../components/ChannelVideos';
import ChannelPlaylist from '../components/ChannelPlaylist';
import ChannelAbout from '../components/ChannelAbout';
import numeral from 'numeral';
import SkeletonChannel from '../components/skeletons/SkeletonChannel';

const ChannelPage = () => {
    const [selected, setSelected] = useState('VIDEOS');
    const { channelId } = useParams();
    const {
        fetchChannelDetails,
        channelDetails,
        isLoading,
        channelVideos,
        fetchVideosByChannel,
    } = useContext(AppContext);

    const nav = ['VIDEOS', 'PLAYLIST', 'ABOUT'];

    const handleOnClick = (list) => {
        setSelected(list);
    };

    const handleSubscribe = () => {
        console.log('subscribe...');
    };

    useEffect(() => {
        fetchChannelDetails(channelId);
        fetchVideosByChannel(channelId);
    }, []);

    return (
        <div className={styles.container}>
            {!isLoading ? (
                <>
                    <div className={styles.channel__header}>
                        <img
                            src={
                                channelDetails?.snippet?.thumbnails?.default
                                    ?.url
                            }
                            alt={channelDetails?.snippet?.title}
                        />
                        <div>
                            <h2>{channelDetails?.snippet?.title}</h2>
                            <p>
                                {numeral(
                                    channelDetails?.statistics?.subscriberCount
                                ).format('0.0a')}{' '}
                                subsribers
                            </p>
                        </div>
                        <button onClick={handleSubscribe}>SUBSCRIBE</button>
                    </div>
                    <ul className={styles.channel__nav}>
                        {nav.map((list, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => handleOnClick(list)}
                                    className={
                                        selected === list
                                            ? styles.selected
                                            : undefined
                                    }
                                >
                                    {list}
                                </li>
                            );
                        })}
                    </ul>
                    {selected === 'VIDEOS' ? (
                        <ChannelVideos channelVideos={channelVideos} />
                    ) : selected === 'PLAYLIST' ? (
                        <ChannelPlaylist channelId={channelId} />
                    ) : (
                        <ChannelAbout
                            description={channelDetails?.snippet?.description}
                            publishedAt={channelDetails?.snippet?.publishedAt}
                            viewCount={channelDetails?.statistics?.viewCount}
                        />
                    )}
                </>
            ) : (
                <SkeletonChannel />
            )}
        </div>
    );
};

export default ChannelPage;
