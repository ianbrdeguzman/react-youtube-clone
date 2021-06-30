import React from 'react';
import styles from './SkeletonVideo.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonVideo = () => {
    return (
        <div className={styles.skeleton}>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <Skeleton height={180} />
                <div>
                    <Skeleton
                        className={styles.skeleton__circle}
                        circle
                        height={40}
                        width={40}
                    />
                    <Skeleton height={40} width='80%' />
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonVideo;
