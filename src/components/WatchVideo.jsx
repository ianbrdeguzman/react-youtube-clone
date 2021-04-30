import React from 'react';
import styles from './WatchVideo.module.css';
import ShowMore from 'react-show-more';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import numeral from 'numeral';
import moment from 'moment';

const WatchVideo = ({ video }) => {
    const {
        id,
        snippet: { channelTitle, description, publishedAt, title },
        statistics: { commentCount, dislikeCount, likeCount, viewCount },
    } = video;

    return (
        <>
            <div className={styles.watch__video__player}>
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder='0'
                    title={video?.snippet?.title}
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
                        <MdThumbUp />{' '}
                        <span>{numeral(likeCount).format('0a')}</span>
                    </h4>
                    <h4>
                        <MdThumbDown />{' '}
                        <span>{numeral(dislikeCount).format('0a')}</span>
                    </h4>
                </div>
            </div>
            <div className={styles.watch__video__moreinfo}>
                <img
                    src='https://yt3.ggpht.com/ytc/AAUvwngXVUOK3DI8g8BHFPtX7Gei9nok-D7yPAkUAo33=s48-c-k-c0x00ffffff-no-rj'
                    alt=''
                />
                <div>
                    <h4>{channelTitle}</h4>
                    <p>10K subscribers</p>
                    <ShowMore
                        lines={2}
                        more='SHOW MORE'
                        less='SHOW LESS'
                        anchorClass={styles.anchor}
                    >
                        <p>{description}</p>
                    </ShowMore>
                </div>
                <button>SUBSCRIBE</button>
            </div>
        </>
    );
};

export default WatchVideo;
