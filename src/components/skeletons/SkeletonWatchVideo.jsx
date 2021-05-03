import React from 'react';
import styles from './SkeletonWatchVideo.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonWatchVideo = () => {
    return (
        <div className={styles.skeleton}>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <div>
                    <Skeleton height='100%' />
                </div>
                <div>
                    <Skeleton height='100%' width='100%' />
                </div>
                <div>
                    <Skeleton circle height={40} width={40} />
                    <Skeleton height={40} width='50%' />
                </div>
                <div>
                    <Skeleton height='100%' width='100%' />
                </div>
                <div>
                    <Skeleton height='100%' width='100%' />
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonWatchVideo;
