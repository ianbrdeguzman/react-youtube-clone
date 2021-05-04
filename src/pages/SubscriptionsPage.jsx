import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/context';
import styles from './SubscriptionsPage.module.css';
import SubscriptionsVideo from '../components/SubscriptionsVideo';

const SubscriptionsPage = () => {
    const { fetchSubscribedChannels } = useContext(AppContext);

    // useEffect(() => {
    //     fetchSubscribedChannels();
    // }, []);

    return (
        <div className={styles.subscription__container}>
            <div className={styles.subcription__content}>
                {[...new Array(20)].map((item, index) => {
                    return <SubscriptionsVideo key={index} />;
                })}
            </div>
        </div>
    );
};

export default SubscriptionsPage;
