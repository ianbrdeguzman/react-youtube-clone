import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/context';
import styles from './SubscriptionsPage.module.css';
import SubscriptionsVideo from '../components/SubscriptionsVideo';
import SkeletonSubscriptions from '../components/skeletons/SkeletonSubscriptions';

const SubscriptionsPage = () => {
    const { fetchSubscribedChannels, isLoading } = useContext(AppContext);

    useEffect(() => {
        fetchSubscribedChannels();
    }, []);

    return (
        <div className={styles.subscription__container}>
            <div className={styles.subcription__content}>
                {isLoading ? (
                    [...new Array(20)].map((item, index) => {
                        return <SubscriptionsVideo key={index} />;
                    })
                ) : (
                    <SkeletonSubscriptions />
                )}
            </div>
        </div>
    );
};

export default SubscriptionsPage;
