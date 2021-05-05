import React from 'react';
import styles from './SkeletonLikedVideo.module.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { v4 as uuidv4 } from 'uuid';

const SkeletonLikedVideo = () => {
    return (
        <div>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                {[...new Array(10)].map(() => {
                    return (
                        <div className={styles.skeleton__item} key={uuidv4()}>
                            <Skeleton width='100%' height='100%' />
                        </div>
                    );
                })}
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonLikedVideo;
