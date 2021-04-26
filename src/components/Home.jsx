import React, { useContext } from 'react';
import { AppContext } from './Context';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid red',
        flex: '1',
        height: '90vh',
    },
}));

const Home = () => {
    const classes = useStyles();
    const { isMenuOpen } = useContext(AppContext);

    return <div className={classes.root}>I am home screen</div>;
};

export default Home;
