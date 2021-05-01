import React from 'react';
import styles from './SkeletonRelatedVideos.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonRelatedVideos = () => {
    return (
        <div className={styles.skeleton}>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
                <div className={styles.skeleton__video}>
                    <Skeleton height='100%' />
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonRelatedVideos;
