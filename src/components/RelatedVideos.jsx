import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import styles from './RelatedVideos.module.css';
import RelatedVideo from './RelatedVideo';
import InfiniteScroll from 'react-infinite-scroll-component';

const RelatedVideos = ({ id, categoryId }) => {
    const {
        relatedVideos,
        fetchRelatedVideos,
        clearRelatedVideos,
    } = useContext(AppContext);

    const fetchMoreRelatedVideos = () => {
        console.log('uncomment to fetch more related videos...');
        // fetchRelatedVideos(id, categoryId);
    };

    const filteredRelatedVideos = Array.from(
        new Set(relatedVideos?.map((video) => video.id.videoId))
    ).map((id) => {
        return {
            video: relatedVideos.find((video) => video.id.videoId === id),
        };
    });

    useEffect(() => {
        if (id && categoryId) fetchRelatedVideos(id, categoryId);
        return () => {
            clearRelatedVideos();
        };
    }, [id, categoryId]);

    return (
        <div className={styles.relatedvideos__container}>
            {
                <InfiniteScroll
                    dataLength={relatedVideos?.length}
                    next={fetchMoreRelatedVideos}
                    hasMore={true}
                >
                    {filteredRelatedVideos
                        ?.filter(({ video }) => video.snippet)
                        .map(({ video }) => {
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
