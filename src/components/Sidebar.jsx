import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarRow from './SidebarRow';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { AppContext } from './Context';

const useStyles = makeStyles((theme) => ({
    open: {
        flex: '.15',
        transform: 'translateX(0%)',
        transition: 'all 0.3s ease',
    },
    close: {
        flex: 'unset',
        width: '0',
        opacity: 0,
        transform: 'translateX(-100%)',
        transition: 'all 0.3s ease',
    },
}));

const Sidebar = () => {
    const { isMenuOpen } = useContext(AppContext);
    const classes = useStyles(isMenuOpen);
    return (
        <div className={isMenuOpen ? classes.open : classes.close}>
            <SidebarRow title='Home' Icon={HomeIcon} />
            <SidebarRow title='Explore' Icon={ExploreIcon} />
            <SidebarRow title='Subscription' Icon={SubscriptionsIcon} />
            <SidebarRow title='Library' Icon={VideoLibraryIcon} />
            <SidebarRow title='History' Icon={HistoryIcon} />
            <SidebarRow title='Your videos' Icon={OndemandVideoIcon} />
            <SidebarRow title='Watch later' Icon={WatchLaterIcon} />
            <SidebarRow title='Liked videos' Icon={ThumbUpIcon} />
        </div>
    );
};

export default Sidebar;
