import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import styles from './RelatedVideos.module.css';
import RelatedVideo from './RelatedVideo';
import InfiniteScroll from 'react-infinite-scroll-component';

const RelatedVideos = ({ id, categoryId }) => {
    const { relatedVideos, fetchRelatedVideos } = useContext(AppContext);

    const fetchMoreRelatedVideos = () => {
        console.log('uncomment to fetch more related videos...');
        // fetchRelatedVideos(id, categoryId);
    };

    useEffect(() => {
        fetchRelatedVideos(id, categoryId);
    }, [id]);

    return (
        <div className={styles.relatedvideos__container}>
            {
                <InfiniteScroll
                    dataLength={relatedVideos?.length}
                    next={fetchMoreRelatedVideos}
                    hasMore={true}
                >
                    {relatedVideos
                        ?.filter((video) => video.snippet)
                        .map((video) => {
                            return (
                                <RelatedVideo
                                    video={video}
                                    key={video.id.videoId}
                                    categoryId={categoryId}
                                />
                            );
                        })}
                </InfiniteScroll>
            }
        </div>
    );
};

export default RelatedVideos;
