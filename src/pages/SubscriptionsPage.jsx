import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/shared/context';
import styles from './styles/SubscriptionsPage.module.css';
import SubscriptionsVideo from '../components/SubscriptionsVideo';
import SkeletonSubscriptions from '../components/skeletons/SkeletonSubscriptions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet-async';

const SubscriptionsPage = () => {
    const {
        fetchSubscribedChannels,
        isLoading,
        subscribedChannels,
        subscribedChannelsNextPageToken,
    } = useContext(AppContext);

    const fetchMoreSubscribedChannels = () => {
        if (subscribedChannelsNextPageToken) fetchSubscribedChannels();
    };

    useEffect(() => {
        fetchSubscribedChannels();
    }, []);

    return (
        <>
            <Helmet>
                <title>Subscriptions | Youtube Clone</title>
            </Helmet>
            <div className={styles.subscription__container}>
                <div className={styles.subcription__content}>
                    <InfiniteScroll
                        dataLength={subscribedChannels?.length}
                        next={fetchMoreSubscribedChannels}
                        hasMore={true}
                    >
                        {!isLoading ? (
                            subscribedChannels?.map((channel) => {
                                return (
                                    <SubscriptionsVideo
                                        key={channel.id}
                                        channel={channel}
                                    />
                                );
                            })
                        ) : (
                            <SkeletonSubscriptions />
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default SubscriptionsPage;
