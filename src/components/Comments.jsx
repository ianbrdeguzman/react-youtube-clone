import React, { useContext, useEffect, useState } from 'react';
import styles from './Comments.module.css';
import numeral from 'numeral';
import { FaUserCircle } from 'react-icons/fa';
import { AppContext } from './context';
import Comment from './Comment';
import InfiniteScroll from 'react-infinite-scroll-component';

const Comments = ({ commentCount, id }) => {
    const {
        fetchCommentsOfVideoById,
        commentList,
        signInWithGoogle,
        addCommentToVideo,
        accessToken,
    } = useContext(AppContext);

    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length === 0) return;
        accessToken ? addCommentToVideo(id, comment) : signInWithGoogle();
    };

    const fetchMoreComments = () => {
        console.log('uncomment to fetch more comments...');
        // fetchCommentsOfVideoById(id);
    };

    useEffect(() => {
        fetchCommentsOfVideoById(id);
    }, [id]);

    return (
        <div className={styles.comments__container}>
            <h4>{numeral(commentCount).format('0,0')} Comments</h4>
            <div className={styles.comments__form}>
                <FaUserCircle />
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='comment'
                        placeholder='Add a public comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    {comment.length > 0 && (
                        <button type='submit'>COMMENT</button>
                    )}
                </form>
            </div>
            <div>
                <InfiniteScroll
                    dataLength={commentList?.length}
                    next={fetchMoreComments}
                    hasMore={true}
                >
                    {commentList.map((comment) => {
                        return <Comment comment={comment} key={comment.id} />;
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Comments;
