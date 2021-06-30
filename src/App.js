import React, { useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/home/HomePage';
import SearchPage from './pages/search/SearchPage';
import WatchPage from './pages/watch/WatchPage';
import ChannelPage from './pages/channel/ChannelPage';
import SubscriptionsPage from './pages/subscription/SubscriptionsPage';
import LikedPage from './pages/liked/LikedPage';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppContext } from './components/shared/context';
import { HelmetProvider } from 'react-helmet-async';

function App() {
    const { isMenuOpen } = useContext(AppContext);

    return (
        <HelmetProvider>
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
        </HelmetProvider>
    );
}

export default App;
