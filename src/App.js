import React, { useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';
import Search from './Pages/Search';
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
                        <Route exact path='/' component={Home} />
                        <Route path='/search/:keyword' component={Search} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
