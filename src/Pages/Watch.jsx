import React, { useContext, useEffect } from 'react';
import styles from './Watch.module.css';
import { useParams } from 'react-router-dom';
import { AppContext } from '../components/Context';
import WatchVideo from '../components/WatchVideo';
import Comments from '../components/Comments';

const Watch = () => {
    const { id } = useParams();
    const { fetchVideoById, watchVideo, isLoading } = useContext(AppContext);

    // const {
    //     statistics: { commentCount },
    // } = watchVideo;

    const commentCount = !isLoading && watchVideo.statistics.commentCount;

    useEffect(() => {
        fetchVideoById(id);
    }, [id]);

    return (
        <div className={styles.watch__container}>
            <div className={styles.watch__video__container}>
                {!isLoading ? (
                    <>
                        <WatchVideo video={watchVideo} />
                        <Comments commentCount={commentCount} />
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div className={styles.watch__related__container}>
                related video
            </div>
        </div>
    );
};

export default Watch;
