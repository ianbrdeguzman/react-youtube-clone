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
        backgroundColor: '#ffffff',
        height: '90vh',
        flexShrink: 0,
        transition: 'transform 0.3s ease',
        position: 'fixed',
        top: '10vh',
        left: 0,
        [theme.breakpoints.only('sm')]: {
            width: '56px',
        },
        [theme.breakpoints.only('md')]: {
            width: '180px',
        },
    },
    list: {
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
        '& div:first-child': {
            minWidth: '24px',
            [theme.breakpoints.down('sm')]: {
                paddingTop: '4px',
                paddingBottom: '4px',
            },
        },
        '& div:nth-child(2)': {
            marginLeft: theme.spacing(2),
            [theme.breakpoints.down('sm')]: {
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
                        <ListItem button key={title} className={classes.list}>
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
