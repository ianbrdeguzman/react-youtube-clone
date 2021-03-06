import React, { useContext, useEffect } from 'react';
import styles from './WatchPage.module.css';
import { AppContext } from '../../components/shared/context';
import WatchVideo from '../../components/watch-video/WatchVideo';
import RelatedVideoList from '../../components/related-video-list/RelatedVideoList';
import { useParams } from 'react-router-dom';
import SkeletonWatchVideo from '../../components/watch-video/skeleton/SkeletonWatchVideo';
import SkeletonRelatedVideos from './skeleton/SkeletonRelatedVideos';
import { VideoContext } from '../../context/videoContext';

const WatchPage = () => {
    const { id } = useParams();
    // const { fetchVideoById, watchVideo, isLoading, categoryId } =
    //     useContext(AppContext);

    const { fetchVideoById, video, loading, categoryId } =
        useContext(VideoContext);

    useEffect(() => {
        fetchVideoById(id);
    }, [id]);

    return (
        <div className={styles.watch__container}>
            <div className={styles.watch__video__container}>
                {!loading ? (
                    <>
                        {video?.map((v) => {
                            return <WatchVideo video={v} key={id} id={id} />;
                        })}
                    </>
                ) : (
                    <SkeletonWatchVideo />
                )}
            </div>
            <div className={styles.watch__related__container}>
                {!loading ? (
                    <RelatedVideoList id={id} categoryId={categoryId} />
                ) : (
                    <SkeletonRelatedVideos />
                )}
            </div>
        </div>
    );
};

export default WatchPage;
