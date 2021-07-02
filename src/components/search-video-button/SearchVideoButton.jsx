import React, { useContext } from 'react';
import styles from './SearchVideoButton.module.css';
import { AuthContext } from '../../context/authContext';
import { ChannelContext } from '../../context/channelContext';

const SearchVideoButton = ({ channelId }) => {
    const { accessToken, signInWithGoogle } = useContext(AuthContext);
    const { subloading, subscriptionStatus, subscribeToChannel } =
        useContext(ChannelContext);

    const handleSubscribeOnClick = () => {
        console.log(channelId);
        accessToken ? subscribeToChannel(channelId) : signInWithGoogle();
    };

    const handleUnsubscribeOnClick = () => {
        alert('Not yet implemented.');
    };

    return (
        <>
            {subloading ? (
                <button disabled>Loading...</button>
            ) : subscriptionStatus ? (
                <button
                    onClick={handleUnsubscribeOnClick}
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
