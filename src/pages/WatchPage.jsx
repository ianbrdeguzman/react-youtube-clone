import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/Context';
import styles from './WatchPage.module.css';
import WatchVideo from '../components/WatchVideo';
import Comments from '../components/Comments';
import RelatedVideos from '../components/RelatedVideos';
import { useParams } from 'react-router-dom';
import request from '../components/axios';
import SkeletonWatchVideo from '../components/skeletons/SkeletonWatchVideo';
import SkeletonRelatedVideos from '../components/skeletons/SkeletonRelatedVideos';

const WatchPage = () => {
    const { id } = useParams();
    const {
        fetchVideoById,
        watchVideo,
        isLoading,
        fetchRelatedVideos,
    } = useContext(AppContext);

    const commentCount = watchVideo?.statistics?.commentCount;
    const channelId = watchVideo?.snippet?.channelId;
    const video = watchVideo.length > 0;

    const [channelIcon, setChannelIcon] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');

    useEffect(() => {
        fetchVideoById(id);
        fetchRelatedVideos(id);
    }, [id]);

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
            } catch (error) {
                console.error(error.message);
            }
        };
        if (channelId) fetchChannelDetails(channelId);
    }, [channelId]);

    return (
        <div className={styles.watch__container}>
            <div className={styles.watch__video__container}>
                {!isLoading ? (
                    <>
                        <WatchVideo
                            video={video}
                            channelIcon={channelIcon}
                            subscriberCount={subscriberCount}
                        />
                        <Comments commentCount={commentCount} id={id} />
                    </>
                ) : (
                    <SkeletonWatchVideo />
                )}
            </div>
            <div className={styles.watch__related__container}>
                {!isLoading ? <RelatedVideos /> : <SkeletonRelatedVideos />}
            </div>
        </div>
    );
};

export default WatchPage;
