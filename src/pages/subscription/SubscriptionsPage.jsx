import React, { useContext, useEffect } from 'react';
import styles from './SubscriptionsPage.module.css';
import SubscriptionsVideo from '../../components/subscriptions-video/SubscriptionsVideo';
import SkeletonSubscriptions from './skeleton/SkeletonSubscriptions';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet-async';
import { ChannelContext } from '../../context/channelContext';
import { filterArr } from '../../helpers/helpers';

const SubscriptionsPage = () => {
    const { loading, fetchSubscribedChannels, channels, nextPageToken } =
        useContext(ChannelContext);

    const fetchMoreSubscribedChannels = () => {
        if (nextPageToken) fetchSubscribedChannels();
    };

    const filteredChannels = filterArr(channels);

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
                        dataLength={filteredChannels?.length}
                        next={fetchMoreSubscribedChannels}
                        hasMore={true}
                    >
                        {!loading ? (
                            filteredChannels?.map((channel) => {
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
