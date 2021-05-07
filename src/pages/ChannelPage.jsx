import React, { useContext, useState, useEffect } from 'react';
import styles from './styles/ChannelPage.module.css';
import { useParams } from 'react-router-dom';
import { AppContext } from '../components/shared/context';
import ChannelVideoList from '../components/ChannelVideoList';
import ChannelPlaylist from '../components/ChannelPlaylist';
import ChannelAbout from '../components/ChannelAbout';
import numeral from 'numeral';
import SkeletonChannel from '../components/skeletons/SkeletonChannel';
import { Helmet } from 'react-helmet-async';

const ChannelPage = () => {
    const [selected, setSelected] = useState('VIDEOS');
    const { channelId } = useParams();
    const {
        fetchChannelDetails,
        channelDetails,
        isLoading,
        channelVideos,
        fetchVideosByChannel,
        fetchChannelSubscriptionStatus,
        channelSubscriptionStatus,
        subscribeToChannel,
        accessToken,
        signInWithGoogle,
        clearSubscribedStatus,
    } = useContext(AppContext);

    const nav = ['VIDEOS', 'PLAYLIST', 'ABOUT'];

    const handleOnClick = (list) => {
        setSelected(list);
    };

    const handleSubscribe = () => {
        accessToken ? subscribeToChannel(channelId) : signInWithGoogle();
    };

    useEffect(() => {
        fetchChannelDetails(channelId);
        fetchVideosByChannel(channelId);
        if (accessToken) fetchChannelSubscriptionStatus(channelId);
        return () => {
            clearSubscribedStatus();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>{`${channelDetails?.snippet?.title}  | Youtube Clone`}</title>
            </Helmet>
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
                                        channelDetails?.statistics
                                            ?.subscriberCount
                                    ).format('0.0a')}{' '}
                                    subsribers
                                </p>
                            </div>
                            {channelSubscriptionStatus ? (
                                <button disabled className={styles.disabled}>
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
                            <ChannelVideoList channelVideos={channelVideos} />
                        ) : selected === 'PLAYLIST' ? (
                            <ChannelPlaylist channelId={channelId} />
                        ) : (
                            <ChannelAbout
                                description={
                                    channelDetails?.snippet?.description
                                }
                                publishedAt={
                                    channelDetails?.snippet?.publishedAt
                                }
                                viewCount={
                                    channelDetails?.statistics?.viewCount
                                }
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
