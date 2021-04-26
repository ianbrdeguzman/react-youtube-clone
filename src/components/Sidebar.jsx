import React, { useContext } from 'react';
import { AppContext } from './Context';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const list = [
    { title: 'Home', icon: <HomeIcon /> },
    { title: 'Explore', icon: <ExploreIcon /> },
    { title: 'Subscriptions', icon: <SubscriptionsIcon /> },
    { title: 'Library', icon: <VideoLibraryIcon /> },
    { title: 'History', icon: <HistoryIcon /> },
    { title: 'Your videos', icon: <OndemandVideoIcon /> },
    { title: 'Watch later', icon: <WatchLaterIcon /> },
    { title: 'Liked videos', icon: <ThumbUpIcon /> },
];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[50],
        height: '90vh',
    },
    list: {
        padding: theme.spacing(2),

        display: 'flex',
        alignItems: 'center',
        '& p': {
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.only('xs')]: {
            '& p': {
                display: 'none',
            },
        },
    },
}));

const Sidebar = () => {
    const classes = useStyles();
    const { isMenuOpen } = useContext(AppContext);

    return (
        <nav className={classes.root}>
            <List>
                {list.map(({ title, icon }) => {
                    return (
                        <ListItem button>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    );
                })}
            </List>
        </nav>
    );
};

export default Sidebar;
