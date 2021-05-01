import React, { useContext } from 'react';
import { AppContext } from './Context';
import styles from './RelatedVideos.module.css';
import RelatedVideo from './RelatedVideo';

const RelatedVideos = () => {
    const { relatedVideos, isLoading } = useContext(AppContext);

    return (
        <div className={styles.relatedvideos__container}>
            {!isLoading ? (
                relatedVideos
                    ?.filter((video) => video.snippet)
                    .map((video) => {
                        return (
                            <RelatedVideo
                                video={video}
                                key={video.id.videoId}
                            />
                        );
                    })
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default RelatedVideos;
