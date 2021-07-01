import React, { useContext, useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomePage from './pages/home/HomePage';
import SearchPage from './pages/search/SearchPage';
import WatchPage from './pages/watch/WatchPage';
import ChannelPage from './pages/channel/ChannelPage';
import SubscriptionsPage from './pages/subscription/SubscriptionsPage';
import LikedPage from './pages/liked/LikedPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MenuContext } from './context/menuContext';
import { AuthContext } from './context/authContext';
import firebase from './helpers/firebase';

function App() {
    const { isMenuOpen } = useContext(MenuContext);
    const { keepSignIn } = useContext(AuthContext);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        if (user) {
            keepSignIn(user);
        }
    }, [user]);

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
