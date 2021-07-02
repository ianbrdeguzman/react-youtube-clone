import React, { useContext, useEffect } from 'react';
import styles from './RelatedVideoList.module.css';
import RelatedVideo from '../related-video/RelatedVideo';
import { VideoContext } from '../../context/videoContext';
import { filterArr } from '../../helpers/helpers';
import SkeletonRelatedVideos from '../../pages/watch/skeleton/SkeletonRelatedVideos';

const RelatedVideoList = ({ id, categoryId }) => {
    const { relLoading, relatedVideos, fetchRelatedVideos } =
        useContext(VideoContext);

    const filteredVideos = filterArr(relatedVideos);
    console.log(filteredVideos);

    useEffect(() => {
        if (id && categoryId) fetchRelatedVideos(id, categoryId);
    }, [id, categoryId]);

    return (
        <div className={styles.relatedvideos__container}>
            {relLoading ? (
                <SkeletonRelatedVideos />
            ) : (
                filteredVideos
                    ?.filter((video) => video.snippet)
                    .map((video) => {
                        return (
                            <RelatedVideo
                                video={video}
                                key={video.id.videoId}
                                categoryId={categoryId}
                            />
                        );
                    })
            )}
        </div>
    );
};

export default RelatedVideoList;
