import React from 'react';
import styles from './styles/LikedVideo.module.css';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const LikedVideo = ({ video, index }) => {
    const {
        contentDetails: { duration },
        id,
        snippet: {
            channelTitle,
            thumbnails: {
                medium: { url },
            },
            title,
        },
    } = video;

    const history = useHistory();

    const seconds = moment.duration(duration).asSeconds();
    const formatDuration = moment.utc(seconds * 1000).format('mm:ss');

    const handleOnClick = (e) => {
        e.target.outerHTML ===
        '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>'
            ? console.log('remove')
            : history.push(`/watch/${id}`);
    };

    return (
        <div
            className={styles.likedpage__content__item}
            onClick={handleOnClick}
        >
            <p>{index}</p>
            <div className={styles.likedpage__content__item__img}>
                <img src={url} alt={title} />
                <span>WATCHED</span>
                <span>{formatDuration}</span>
            </div>
            <div className={styles.likedpage__content__item__info}>
                <div>
                    <h4>{title}</h4>
                    <p>{channelTitle}</p>
                </div>
                <button>
                    <MdDelete />
                </button>
            </div>
        </div>
    );
};

export default LikedVideo;
