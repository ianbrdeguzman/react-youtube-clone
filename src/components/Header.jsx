import React, { useContext } from 'react';
import { AppContext } from './Context';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '10vh',
        backgroundColor: '#ffffff',
        padding: theme.spacing(2),
        position: 'sticky',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            height: '24px',
            marginLeft: theme.spacing(1),
        },
        '& > *': {
            cursor: 'pointer',
        },
    },
    form: {
        width: '50vw',
        border: '1px solid lightgrey',
        display: 'flex',
        '& input': {
            width: '100%',
            padding: '0 0.5rem',
            border: 'none',
            outline: 'none',
            fontFamily: 'inherit',
        },
        '& button': {
            cursor: 'pointer',
            width: '60px',
            border: 'none',
            outline: 'none',
            color: 'grey',
            borderLeft: '1px solid lightgrey',
        },
    },
    icons: {
        display: 'flex',
        '& :not(:last-child)': {
            marginRight: theme.spacing(1),
            [theme.breakpoints.only('xs')]: {
                display: 'none',
            },
        },
        '& :last-child': {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        '& > *': {
            cursor: 'pointer',
        },
    },
}));
const Header = () => {
    const { onMenuClick } = useContext(AppContext);
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <div className={classes.menu}>
                <MenuIcon onClick={onMenuClick} />
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
                    alt='logo'
                />
            </div>
            <form className={classes.form}>
                <input type='text' placeholder='Search' />
                <button type='submit'>
                    <SearchIcon />
                </button>
            </form>
            <div className={classes.icons}>
                <NotificationsIcon />
                <AppsIcon />
                <Avatar />
            </div>
        </header>
    );
};

export default Header;
