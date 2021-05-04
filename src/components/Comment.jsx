import React from 'react';
import styles from './Comment.module.css';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import ShowMore from 'react-show-more';
import moment from 'moment';
import numeral from 'numeral';

const Comment = ({ comment }) => {
    const {
        snippet: {
            topLevelComment: {
                snippet: {
                    authorDisplayName,
                    authorProfileImageUrl,
                    likeCount,
                    publishedAt,
                    textOriginal,
                },
            },
        },
    } = comment;

    return (
        <article className={styles.comment__container}>
            <img src={authorProfileImageUrl} alt={authorDisplayName} />
            <div className={styles.comment__info}>
                <p>
                    {authorDisplayName}{' '}
                    <span>{moment(publishedAt).fromNow()}</span>
                </p>
                <ShowMore
                    lines={1}
                    more='Read more'
                    less='Show less'
                    anchorClass={styles.anchor}
                >
                    <p>{textOriginal}</p>
                </ShowMore>
                <div>
                    <p>
                        <MdThumbUp /> {numeral(likeCount).format('0,0')}
                    </p>
                    <p>
                        <MdThumbDown /> 0
                    </p>
                </div>
            </div>
        </article>
    );
};

export default Comment;
