import React, { useState, useEffect, useContext } from 'react';
import styles from './WatchVideo.module.css';
import CommentList from '../comment-list/CommentList';
import ShowMore from 'react-show-more';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import numeral from 'numeral';
import moment from 'moment';
import request from '../../helpers/axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../shared/context';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../context/authContext';
import { ChannelContext } from '../../context/channelContext';

const WatchVideo = ({ video, id }) => {
    const { likeAVideo, dislikeAVideo } = useContext(AppContext);

    const {
        subsLoading,
        fetchSubscriptionStatus,
        subscriptionStatus,
        subscribeToChannel,
    } = useContext(ChannelContext);

    const { accessToken, signInWithGoogle } = useContext(AuthContext);

    const {
        snippet: { channelId, channelTitle, description, publishedAt, title },
        statistics: { commentCount, dislikeCount, likeCount, viewCount },
    } = video;

    const [channelIcon, setChannelIcon] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');

    const history = useHistory();

    useEffect(() => {
        const fetchChannelDetails = async (id) => {
            try {
                const {
                    data: { items },
                } = await request('/channels', {
                    params: {
                        part: 'snippet,statistics',
                        id: id,
                    },
                });
                setChannelIcon(items[0].snippet.thumbnails.default.url);
                setSubscriberCount(items[0].statistics.subscriberCount);
            } catch (error) {
                console.error(error.message);
            }
        };
        if (channelId) {
            fetchChannelDetails(channelId);
            if (accessToken) fetchSubscriptionStatus(channelId);
        }
    }, [channelId]);

    const handleChannelOnClick = () => {
        history.push(`/channel/${channelId}`);
    };

    const handleSubcribeOnClick = () => {
        accessToken ? subscribeToChannel(channelId) : signInWithGoogle();
    };

    const handleUnsubscribeOnClick = () => {
        alert('Not yet implemented...');
    };

    const handleLikeOnClick = () => {
        accessToken ? likeAVideo(id) : signInWithGoogle();
    };

    const handleDislikeOnClick = () => {
        accessToken ? dislikeAVideo(id) : signInWithGoogle();
    };

    return (
        <>
            <Helmet>
                <title>{title} | Youtube Clone</title>
            </Helmet>
            <div className={styles.watch__video__container}>
                <div className={styles.watch__video__player}>
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder='0'
                        title='Video Title'
                        allowFullScreen
                        width='100%'
                        height='100%'
                    ></iframe>
                </div>
                <div className={styles.watch__video__info}>
                    <h3>{title}</h3>
                    <p>
                        {numeral(viewCount).format('0,0')}
                        {' views • '}
                        {moment(publishedAt).format('ll')}
                    </p>
                    <div>
                        <h4>
                            <MdThumbUp onClick={handleLikeOnClick} />{' '}
                            <span>{numeral(likeCount).format('0a')}</span>
                        </h4>
                        <h4>
                            <MdThumbDown onClick={handleDislikeOnClick} />{' '}
                            <span>{numeral(dislikeCount).format('0a')}</span>
                        </h4>
                    </div>
                </div>
                <div className={styles.watch__video__moreinfo}>
                    <img src={channelIcon} alt={channelTitle} />
                    <div>
                        <h4 onClick={handleChannelOnClick}>{channelTitle}</h4>
                        <p>
                            {numeral(subscriberCount).format('0.0a')}{' '}
                            subscribers
                        </p>
                    </div>
                    {subsLoading ? (
                        <button disabled>Loading...</button>
                    ) : subscriptionStatus ? (
                        <button
                            className={styles.disabled}
                            onClick={handleUnsubscribeOnClick}
                        >
                            SUBSCRIBED
                        </button>
                    ) : (
                        <button onClick={handleSubcribeOnClick}>
                            SUBSCRIBE
                        </button>
                    )}
                </div>
                <ShowMore
                    lines={2}
                    more='SHOW MORE'
                    less='SHOW LESS'
                    anchorClass={styles.anchor}
                    className={styles.watch__video__description}
                >
                    <p>{description}</p>
                </ShowMore>
            </div>
            <CommentList id={id} commentCount={commentCount} />
        </>
    );
};

export default WatchVideo;
