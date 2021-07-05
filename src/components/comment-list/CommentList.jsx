import React, { useContext, useEffect, useState } from 'react';
import styles from './CommentList.module.css';
import Comment from '../comment/Comment';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/authContext';
import { CommentContext } from '../../context/commentContext';
import numeral from 'numeral';

const CommentList = ({ commentCount, id }) => {
    const { fetchCommentsOfVideoById, addCommentToVideo, comments } =
        useContext(CommentContext);

    const { accessToken, userProfile, signInWithGoogle } =
        useContext(AuthContext);

    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length === 0) return;
        if (accessToken) {
            addCommentToVideo(id, comment);
            setComment('');
        } else {
            signInWithGoogle();
        }
    };

    useEffect(() => {
        fetchCommentsOfVideoById(id);
    }, [id]);

    return (
        <div className={styles.comments__container}>
            <h4>{numeral(commentCount).format('0,0')} Comments</h4>
            <div className={styles.comments__form}>
                {userProfile ? (
                    <img src={userProfile?.photoURL} alt='avatar' />
                ) : (
                    <FaUserCircle />
                )}
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
                {comments?.map((comment) => {
                    return <Comment comment={comment} key={comment.id} />;
                })}
            </div>
        </div>
    );
};

export default CommentList;
