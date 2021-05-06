import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/context';
import styles from './styles/SubscriptionsPage.module.css';
import SubscriptionsVideo from '../components/SubscriptionsVideo';
import SkeletonSubscriptions from '../components/skeletons/SkeletonSubscriptions';
import InfiniteScroll from 'react-infinite-scroll-component';

const SubscriptionsPage = () => {
    const {
        fetchSubscribedChannels,
        isLoading,
        subscribedChannels,
        subscribedChannelsNextPageToken,
        clearSubscribedChannels,
    } = useContext(AppContext);

    const fetchMoreSubscribedChannels = () => {
        if (subscribedChannelsNextPageToken) fetchSubscribedChannels();
    };

    useEffect(() => {
        fetchSubscribedChannels();
        return () => {
            clearSubscribedChannels();
        };
    }, []);

    return (
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
    );
};

export default SubscriptionsPage;
