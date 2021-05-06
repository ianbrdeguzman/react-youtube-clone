import React, { useContext, useEffect } from 'react';
import styles from './LikedPage.module.css';
import LikedVideo from '../components/LikedVideo';
import { AppContext } from '../components/context';
import SkeletonLikedVideo from '../components/skeletons/SkeletonLikedVideo';
import InfiniteScroll from 'react-infinite-scroll-component';

const LikedPage = () => {
    const {
        fetchLikedVideos,
        likedVideos,
        isLoading,
        likedVideosNextPageToken,
        clearLikedVideos,
    } = useContext(AppContext);

    const fetchMoreLikedVideos = () => {
        if (likedVideosNextPageToken)
            console.log('fetching more liked videos...');
    };

    useEffect(() => {
        fetchLikedVideos();
        return () => {
            clearLikedVideos();
        };
    }, []);

    return (
        <div className={styles.likedpage__container}>
            <div className={styles.likedpage__content}>
                <InfiniteScroll
                    dataLength={likedVideos?.length}
                    next={fetchMoreLikedVideos}
                    hasMore={true}
                >
                    {!isLoading ? (
                        <>
                            {likedVideos?.map((video, index) => {
                                return (
                                    <LikedVideo
                                        video={video}
                                        key={video.id}
                                        index={index + 1}
                                    />
                                );
                            })}
                        </>
                    ) : (
                        <SkeletonLikedVideo />
                    )}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default LikedPage;