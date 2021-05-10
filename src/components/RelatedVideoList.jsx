import React, { useContext, useEffect } from 'react';
import { AppContext } from './shared/context';
import styles from './styles/RelatedVideoList.module.css';
import RelatedVideo from './RelatedVideo';

const RelatedVideoList = ({ id, categoryId }) => {
    const { relatedVideos, fetchRelatedVideos } = useContext(AppContext);

    const filteredRelatedVideos = Array.from(
        new Set(relatedVideos?.map((video) => video.id.videoId))
    ).map((id) => {
        return {
            video: relatedVideos.find((video) => video.id.videoId === id),
        };
    });

    useEffect(() => {
        if (id && categoryId) fetchRelatedVideos(id, categoryId);
    }, [id, categoryId]);

    return (
        <div className={styles.relatedvideos__container}>
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
        </div>
    );
};

export default RelatedVideoList;
