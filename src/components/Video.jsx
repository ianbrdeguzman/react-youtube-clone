import React, { useEffect, useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral';
import moment from 'moment';
import request from './axios';

const useStyles = makeStyles((theme) => ({
    image: {
        '& > img': {
            width: '100%',
            objectFit: 'contain',
        },
    },
    content: {
        padding: theme.spacing(1),
        '& img': {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
        },
        '& > div': {
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(1),
        },
        '& > div img': {
            marginRight: theme.spacing(1),
        },
        '& > div h3': {
            overflow: 'hidden',
            display: '-webkit-box',
            lineClamp: 2,
            boxOrient: 'vertical',
        },
    },
}));

const Video = ({ video }) => {
    const classes = useStyles();

    const [channelIcon, setChannelIcon] = useState('');

    const {
        snippet: {
            title,
            thumbnails: {
                medium: { url },
            },
            channelTitle,
            publishedAt,
            channelId,
        },
        statistics: { viewCount },
    } = video;

    useEffect(() => {
        const fetchChannelIcon = async (id) => {
            try {
                const {
                    data: { items },
                } = await request('/channels', {
                    params: {
                        part: 'snippet',
                        id: id,
                    },
                });
                setChannelIcon(items[0].snippet.thumbnails.default.url);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchChannelIcon(channelId);
    }, [channelId]);

    return (
        <Card>
            <div className={classes.image}>
                <img src={url} alt={title} />
            </div>
            <div className={classes.content}>
                <div>
                    <img src={channelIcon} alt={channelTitle} />
                    <Typography component='h3' variant='subtitle1'>
                        {title}
                    </Typography>
                </div>
                <Typography variant='body2' color={'textSecondary'}>
                    {channelTitle}
                </Typography>
                <Typography variant='body2' color={'textSecondary'}>
                    {numeral(viewCount).format('0.0a')}
                    {' views • '}
                    {moment(publishedAt).fromNow()}
                </Typography>
            </div>
        </Card>
    );
};

export default Video;
