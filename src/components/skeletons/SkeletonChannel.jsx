import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './SkeletonChannel.module.css';
import { v4 as uuidv4 } from 'uuid';

const SkeletonChannel = () => {
    return (
        <div className={styles.skeleton}>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <div className={styles.skeleton__header}>
                    <Skeleton circle width={80} height={80} />
                    <Skeleton width='40%' height={80} />
                </div>
                <div className={styles.skeleton__header}>
                    <Skeleton width={60} height={40} />
                    <Skeleton width={60} height={40} />
                    <Skeleton width={60} height={40} />
                </div>
                <div className={styles.skeleton__content}>
                    {[...new Array(24)].map(() => {
                        return (
                            <div
                                className={styles.skeleton__content__item}
                                key={uuidv4()}
                            >
                                <Skeleton width='100%' height='100%' />
                            </div>
                        );
                    })}
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonChannel;
