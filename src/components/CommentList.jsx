import React, { useContext, useEffect, useState } from 'react';
import styles from './styles/Comments.module.css';
import numeral from 'numeral';
import { FaUserCircle } from 'react-icons/fa';
import { AppContext } from './shared/context';
import Comment from './Comment';

const CommentList = ({ commentCount, id }) => {
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
        setComment('');
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
                {filteredCommentList?.map(({ comment }) => {
                    return <Comment comment={comment} key={comment.id} />;
                })}
            </div>
        </div>
    );
};

export default CommentList;
