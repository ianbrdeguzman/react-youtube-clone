import React, { useContext } from 'react';
import { AppContext } from './shared/context';
import styles from './styles/SearchVideoButton.module.css';

const SearchVideoButton = ({ channelId }) => {
    const {
        channelSubscriptionStatus,
        accessToken,
        subscribeToChannel,
        signInWithGoogle,
    } = useContext(AppContext);

    const handleSubscribeOnClick = () => {
        accessToken ? subscribeToChannel(channelId) : signInWithGoogle();
    };

    return (
        <>
            {channelSubscriptionStatus ? (
                <button
                    disabled
                    className={`${styles.button} ${styles.disabled}`}
                >
                    SUBSCIBED
                </button>
            ) : (
                <button onClick={handleSubscribeOnClick}>SUBSCRIBE</button>
            )}
        </>
    );
};

export default SearchVideoButton;
