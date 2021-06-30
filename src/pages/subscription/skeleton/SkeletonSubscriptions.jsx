import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from './SkeletonSubscriptions.module.css';
import { v4 as uuidv4 } from 'uuid';

const SkeletonSubscriptions = () => {
    return (
        <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
            <div>
                {[...new Array(10)].map(() => {
                    return (
                        <div className={styles.skeleton__item} key={uuidv4()}>
                            <div className={styles.skeleton__item__img}>
                                <Skeleton width='100%' height='100%' circle />
                            </div>
                            <div className={styles.skeleton__item__title}>
                                <Skeleton width='100%' height='100%' />
                            </div>
                            <div className={styles.skeleton__item__button}>
                                <Skeleton width='100%' height='100%' />
                            </div>
                        </div>
                    );
                })}
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonSubscriptions;
