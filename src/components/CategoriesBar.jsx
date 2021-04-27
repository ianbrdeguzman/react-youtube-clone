import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const categories = [
    'All',
    'React js',
    'Material UI',
    'React Native',
    'Youtube API',
    'useContext',
    'useReducer',
    'Redux',
    'Music',
    'Guitar',
    'Movies',
    'Coding',
    'Web dev',
    'Axios js',
    'Real Madrid',
    'Gatsby',
    'Firebase',
    'Firebase Auth',
];

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: '1px solid lightgrey',
        borderBottom: '1px solid lightgrey',
        backgroundColor: '#ffffff',
        marginBottom: theme.spacing(2),
        display: 'flex',
        overflowX: 'scroll',
        position: 'fixed',
        top: '10vh',
        [theme.breakpoints.only('sm')]: {
            marginLeft: '56px',
            width: 'calc(100vw - 56px)',
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '180px',
            width: 'calc(100vw - 180px)',
        },
    },
    button: {
        margin: theme.spacing(1),
        borderRadius: '3rem',
        backgroundColor: theme.palette.grey[50],
        '& span p': {
            textTransform: 'capitalize',
        },
    },
    active: {},
}));

const CategoriesBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {categories.map((keyword, index) => {
                return <span key={index}>{keyword}</span>;
            })}
        </div>
    );
};

export default CategoriesBar;
