import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from './Context';

const useStyles = makeStyles((theme) => ({
    open: {
        flex: '0.85',
        border: '1px solid red',
        backgroundColor: 'white',
        zIndex: 1,
    },
    close: {
        flex: '1',
        border: '1px solid green',
        backgroundColor: 'white',
        zIndex: 1,
    },
}));

const HomeScreen = () => {
    const { isMenuOpen } = useContext(AppContext);
    const classes = useStyles(isMenuOpen);

    return (
        <div className={isMenuOpen ? classes.open : classes.close}>
            I am home screen
        </div>
    );
};

export default HomeScreen;
