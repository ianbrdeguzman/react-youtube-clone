import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <>
            <Header />
            <div className={classes.root}>
                <Sidebar />
                <Home />
            </div>
        </>
    );
}

export default App;
