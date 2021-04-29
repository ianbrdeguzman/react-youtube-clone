import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './SearchSkeletonVideo.module.css';

const SearchSkeletonVideo = () => {
    return (
        <div className={styles.skeleton}>
            <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                <div className={styles.skeleton__content}>
                    <div className={styles.skeleton__content__header}>
                        <Skeleton height={180} width={300} />
                    </div>
                    <div className={styles.skeleton__content__info}>
                        <Skeleton
                            height={40}
                            width='95%'
                            className={styles.skeleton__content__item}
                        />
                        <div>
                            <Skeleton
                                className={styles.skeleton__content__item}
                                circle
                                height={40}
                                width={40}
                            />
                            <Skeleton
                                height={40}
                                width='85%'
                                className={styles.skeleton__content__item}
                            />
                        </div>
                        <Skeleton
                            height={40}
                            width='95%'
                            className={styles.skeleton__content__item}
                        />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    );
};

export default SearchSkeletonVideo;
