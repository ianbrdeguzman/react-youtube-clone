import React, { useContext, useEffect, useState } from 'react';
import styles from './Comments.module.css';
import numeral from 'numeral';
import { FaUserCircle } from 'react-icons/fa';
import { AppContext } from './Context';
import Comment from './Comment';
import InfiniteScroll from 'react-infinite-scroll-component';

const Comments = ({ commentCount, id }) => {
    const { fetchCommentsOfVideoById, commentList } = useContext(AppContext);

    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted', input);
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
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {input.length > 0 && <button type='submit'>COMMENT</button>}
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
