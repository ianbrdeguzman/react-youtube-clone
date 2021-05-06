import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/context';
import styles from './styles/WatchPage.module.css';
import WatchVideo from '../components/WatchVideo';
import RelatedVideos from '../components/RelatedVideos';
import { useParams } from 'react-router-dom';
import SkeletonWatchVideo from '../components/skeletons/SkeletonWatchVideo';
import SkeletonRelatedVideos from '../components/skeletons/SkeletonRelatedVideos';

const WatchPage = () => {
    const { id } = useParams();
    const {
        fetchVideoById,
        watchVideo,
        isLoading,
        categoryId,
        clearSubscribedStatus,
    } = useContext(AppContext);

    useEffect(() => {
        fetchVideoById(id);
        return () => {
            clearSubscribedStatus();
        };
    }, [id]);

    return (
        <div className={styles.watch__container}>
            <div className={styles.watch__video__container}>
                {!isLoading ? (
                    <>
                        {watchVideo?.map((video) => {
                            return (
                                <WatchVideo video={video} key={id} id={id} />
                            );
                        })}
                    </>
                ) : (
                    <SkeletonWatchVideo />
                )}
            </div>
            <div className={styles.watch__related__container}>
                {!isLoading ? (
                    <RelatedVideos id={id} categoryId={categoryId} />
                ) : (
                    <SkeletonRelatedVideos />
                )}
            </div>
        </div>
    );
};

export default WatchPage;
