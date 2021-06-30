import React, { useContext, useEffect } from 'react';
import styles from './SubscriptionsPage.module.css';
import { AppContext } from '../../components/shared/context';
import SubscriptionsVideo from '../../components/subscriptions-video/SubscriptionsVideo';
import SkeletonSubscriptions from './skeleton/SkeletonSubscriptions';
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
