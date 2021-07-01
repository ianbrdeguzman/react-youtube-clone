import React, { useContext, useEffect } from 'react';
import styles from './LikedPage.module.css';
import LikedVideo from '../../components/liked-video/LikedVideo';
import SkeletonLikedVideo from './skeleton/SkeletonLikedVideo';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet-async';
import { LikedContext } from '../../context/likedContext';
import { filterArr } from '../../helpers/helpers';

const LikedPage = () => {
    const { loading, videos, nextPageToken, fetchLikedVideos } =
        useContext(LikedContext);

    const fetchMoreLikedVideos = () => {
        if (nextPageToken) fetchLikedVideos();
    };

    const filteredVideos = filterArr(videos);

    useEffect(() => {
        fetchLikedVideos();
    }, []);

    return (
        <>
            <Helmet>
                <title>Liked Videos | Youtube Clone</title>
            </Helmet>
            <div className={styles.likedpage__container}>
                <div className={styles.likedpage__content}>
                    <InfiniteScroll
                        dataLength={filteredVideos?.length}
                        next={fetchMoreLikedVideos}
                        hasMore={true}
                    >
                        {!loading ? (
                            <>
                                {filteredVideos?.map((video, index) => {
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
        </>
    );
};

export default LikedPage;
