import React, { useContext } from 'react';
import styles from './SearchVideoButton.module.css';
import { AppContext } from './../shared/context';
import { AuthContext } from '../../context/authContext';

const SearchVideoButton = ({ channelId }) => {
    const { channelSubscriptionStatus, subscribeToChannel, signInWithGoogle } =
        useContext(AppContext);

    const { accessToken } = useContext(AuthContext);

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
