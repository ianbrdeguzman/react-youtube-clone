import React, { useContext, useEffect, useState } from 'react';
import styles from './styles/Comments.module.css';
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
        clearCommentList,
    } = useContext(AppContext);

    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length === 0) return;
        accessToken ? addCommentToVideo(id, comment) : signInWithGoogle();
        setComment('');
    };

    const fetchMoreComments = () => {
        console.log('uncomment to fetch more comments...');
        // if (commentListNextPageToken) fetchCommentsOfVideoById(id);
    };

    const filteredCommentList = Array.from(
        new Set(commentList?.map((comment) => comment.id))
    ).map((id) => {
        return {
            comment: commentList.find((comment) => comment.id === id),
        };
    });

    useEffect(() => {
        fetchCommentsOfVideoById(id);
        return () => {
            clearCommentList();
        };
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
                    {filteredCommentList?.map(({ comment }) => {
                        return <Comment comment={comment} key={comment.id} />;
                    })}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default Comments;
