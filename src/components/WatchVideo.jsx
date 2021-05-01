import React from 'react';
import styles from './WatchVideo.module.css';
import ShowMore from 'react-show-more';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import numeral from 'numeral';
import moment from 'moment';

const WatchVideo = ({ video, channelIcon, subscriberCount }) => {
    const { id } = video;

    // const { channelTitle, description, publishedAt, title } = video?.snippet;
    // const { dislikeCount, likeCount, viewCount } = video?.statistics;

    return (
        <div className={styles.watch__video__container}>
            <div className={styles.watch__video__player}>
                <iframe
                    src={`https://www.youtube.com/embed/${video?.id}`}
                    frameBorder='0'
                    title={video?.snippet?.title}
                    allowFullScreen
                    width='100%'
                    height='100%'
                ></iframe>
            </div>
            <div className={styles.watch__video__info}>
                <h3>{video?.snippet?.title}</h3>
                <p>
                    {numeral(video?.statistics?.viewCount).format('0,0')}
                    {' views • '}
                    {moment(video?.snippet?.publishedAt).format('ll')}
                </p>
                <div>
                    <h4>
                        <MdThumbUp />{' '}
                        <span>
                            {numeral(video?.statistics?.likeCount).format('0a')}
                        </span>
                    </h4>
                    <h4>
                        <MdThumbDown />{' '}
                        <span>
                            {numeral(video?.statistics?.dislikeCount).format(
                                '0a'
                            )}
                        </span>
                    </h4>
                </div>
            </div>
            <div className={styles.watch__video__moreinfo}>
                <img src={channelIcon} alt={video?.snippet?.channelTitle} />
                <div>
                    <h4>{video?.snippet?.channelTitle}</h4>
                    <p>{numeral(subscriberCount).format('0.0a')} subscribers</p>
                </div>
                <button>SUBSCRIBE</button>
            </div>
            <ShowMore
                lines={2}
                more='SHOW MORE'
                less='SHOW LESS'
                anchorClass={styles.anchor}
                className={styles.watch__video__description}
            >
                <p>{video?.snippet?.description}</p>
            </ShowMore>
        </div>
    );
};

export default WatchVideo;
