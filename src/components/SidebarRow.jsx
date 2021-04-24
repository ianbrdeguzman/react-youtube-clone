import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: theme.spacing(1),
        },
        '&:hover': {
            backgroundColor: theme.palette.grey[300],
        },
        '& p': {
            [theme.breakpoints.only('xs')]: {
                display: 'none',
            },
        },
    },
    icon: {
        color: theme.palette.grey[700],
    },
}));

const SidebarRow = ({ title, Icon }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Icon className={classes.icon} />
            <Typography>{title}</Typography>
        </div>
    );
};

export default SidebarRow;
