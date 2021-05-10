import React, { useContext, useEffect, useState } from 'react';
import styles from './styles/CommentList.module.css';
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
        userProfile,
    } = useContext(AppContext);

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
                {commentList?.map((comment) => {
                    return <Comment comment={comment} key={comment.id} />;
                })}
            </div>
        </div>
    );
};

export default CommentList;
