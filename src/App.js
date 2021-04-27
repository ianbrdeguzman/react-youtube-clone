import React, { useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import styles from './App.module.css';
import { AppContext } from './components/Context';

function App() {
    const { isMenuOpen } = useContext(AppContext);

    return (
        <>
            <Header />
            <div className={styles.container}>
                {isMenuOpen && <Sidebar />}
                <Home />
            </div>
        </>
    );
}

export default App;
