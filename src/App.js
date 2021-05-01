import React, { useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WatchPage from './pages/WatchPage';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './components/Context';

function App() {
    const { isMenuOpen } = useContext(AppContext);

    return (
        <>
            <Router>
                <Header />
                <div className={styles.container}>
                    {isMenuOpen && <Sidebar />}
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route path='/search/:keyword' component={SearchPage} />
                        <Route path='/watch/:id' component={WatchPage} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
