import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomeScreen from './components/HomeScreen';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

function App() {
    const classes = useStyles();

    return (
        <>
            <Header />
            <div className={classes.root}>
                <Sidebar />
                <HomeScreen />
            </div>
        </>
    );
}

export default App;
