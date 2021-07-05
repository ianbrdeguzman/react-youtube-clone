import React, { useContext, useState, useEffect } from 'react';
import styles from './ChannelPage.module.css';
import ChannelVideoList from '../../components/channel-video-list/ChannelVideoList';
import ChannelPlaylist from '../../components/channel-playlist/ChannelPlaylist';
import ChannelAbout from '../../components/channel-about/ChannelAbout';
import SkeletonChannel from './skeleton/SkeletonChannel';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChannelContext } from '../../context/channelContext';
import { AuthContext } from '../../context/authContext';
import numeral from 'numeral';

const ChannelPage = () => {
    const [selected, setSelected] = useState('VIDEOS');

    const { channelId } = useParams();

    const { accessToken, signInWithGoogle } = useContext(AuthContext);

    const {
        details,
        loading,
        subsLoading,
        videos,
        subscriptionStatus,
        fetchDetails,
        fetchVideos,
        fetchSubscriptionStatus,
        subscribeToChannel,
    } = useContext(ChannelContext);

    const nav = ['VIDEOS', 'PLAYLIST', 'ABOUT'];

    const handleSubscribe = () => {
        accessToken ? subscribeToChannel(channelId) : signInWithGoogle();
    };

    const handleUnsubscribe = () => {
        alert('Not yet implemented.');
    };

    useEffect(() => {
        fetchDetails(channelId);
        fetchVideos(channelId);
        if (accessToken) fetchSubscriptionStatus(channelId);
    }, [channelId, accessToken]);

    return (
        <>
            <Helmet>
                <title>{`${details?.snippet?.title}  | Youtube Clone`}</title>
            </Helmet>
            <div className={styles.container}>
                {!loading ? (
                    <>
                        <div className={styles.channel__header}>
                            <img
                                src={details?.snippet?.thumbnails?.default?.url}
                                alt={details?.snippet?.title}
                            />
                            <div>
                                <h2>{details?.snippet?.title}</h2>
                                <p>
                                    {numeral(
                                        details?.statistics?.subscriberCount
                                    ).format('0.0a')}{' '}
                                    subsribers
                                </p>
                            </div>
                            {subsLoading ? (
                                <button>Loading...</button>
                            ) : subscriptionStatus ? (
                                <button
                                    onClick={handleUnsubscribe}
                                    className={styles.disabled}
                                >
                                    SUBSCRIBED
                                </button>
                            ) : (
                                <button onClick={handleSubscribe}>
                                    SUBSCRIBE
                                </button>
                            )}
                        </div>
                        <ul className={styles.channel__nav}>
                            {nav.map((list, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => setSelected(list)}
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
                            <ChannelVideoList videos={videos} />
                        ) : selected === 'PLAYLIST' ? (
                            <ChannelPlaylist channelId={channelId} />
                        ) : (
                            <ChannelAbout
                                description={details?.snippet?.description}
                                publishedAt={details?.snippet?.publishedAt}
                                viewCount={details?.statistics?.viewCount}
                            />
                        )}
                    </>
                ) : (
                    <SkeletonChannel />
                )}
            </div>
        </>
    );
};

export default ChannelPage;
