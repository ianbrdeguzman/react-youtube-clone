import React from 'react';
import styles from './Comments.module.css';
import numeral from 'numeral';
import { FaUserCircle } from 'react-icons/fa';

const Comments = ({ commentCount }) => {
    return (
        <div className={styles.container}>
            <h4>{numeral(commentCount).format('0,0')} Comments</h4>
            <div>
                <FaUserCircle />
                <form>
                    <input type='text' name='comment' />
                </form>
            </div>
        </div>
    );
};

export default Comments;
