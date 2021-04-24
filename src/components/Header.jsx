import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './Context';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            padding: theme.spacing(1),
        },
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2),
        },
        backgroundColor: 'rgba(255,255,255,0.9)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    form: {
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid lightgrey',
        '& input': {
            width: '100%',
            padding: '0.3rem',
            paddingLeft: '.5rem',
            border: 'none',
        },
    },
    icon: {
        cursor: 'pointer',
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    menu: {
        cursor: 'pointer',
        marginRight: theme.spacing(1),
    },
    logo: {
        height: '20px',
        [theme.breakpoints.up('sm')]: {
            height: '25px',
        },
    },
    search: {
        cursor: 'pointer',
        width: '50px',
        color: 'gray',
        border: 'none',
        borderLeft: '1px solid lightgrey',
        backgroundColor: '#fafafa',
    },
    avatar: {
        cursor: 'pointer',
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

const Header = () => {
    const classes = useStyles();
    const { onMenuClick } = useContext(AppContext);

    return (
        <header className={classes.root}>
            <div className={classes.container}>
                <MenuIcon className={classes.menu} onClick={onMenuClick} />
                <img
                    className={classes.logo}
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png'
                    alt='logo'
                />
            </div>
            <form className={classes.form}>
                <input type='text' placeholder='Search' />
                <button
                    type='submit'
                    className={classes.search}
                    onClick={(e) => e.preventDefault()}
                >
                    <SearchIcon />
                </button>
            </form>
            <div className={classes.container}>
                <VideoCallIcon className={classes.icon} />
                <AppsIcon className={classes.icon} />
                <NotificationsIcon className={classes.icon} />
                <Avatar className={classes.avatar} />
            </div>
        </header>
    );
};

export default Header;
