import React, { useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import WatchPage from './pages/WatchPage';
import ChannelPage from './pages/ChannelPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import LikedPage from './pages/LikedPage';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './components/shared/context';

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
                        <Route
                            path='/channel/:channelId'
                            component={ChannelPage}
                        />
                        <Route
                            path='/feed/subscriptions'
                            component={SubscriptionsPage}
                        />
                        <Route path='/feed/liked' component={LikedPage} />
                        <Route path='/*' component={HomePage} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
