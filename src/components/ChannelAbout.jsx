import React from 'react';
import styles from './styles/ChannelAbout.module.css';
import moment from 'moment';
import numeral from 'numeral';

const ChannelAbout = ({ description, publishedAt, viewCount }) => {
    return (
        <div className={styles.channel__about}>
            <div>
                <h4>Description</h4>
                <p>{description}</p>
            </div>
            <div>
                <h4>Stats</h4>
                <p>Joined {moment(publishedAt).format('ll')}</p>
                <p>{numeral(viewCount).format('0,0')} views</p>
            </div>
        </div>
    );
};

export default ChannelAbout;
