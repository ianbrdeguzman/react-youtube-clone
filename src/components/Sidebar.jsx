import React, { useContext } from 'react';
import { AppContext } from './Context';
import { AiFillHome } from 'react-icons/ai';
import {
    MdExplore,
    MdSubscriptions,
    MdVideoLibrary,
    MdHistory,
    MdOndemandVideo,
    MdWatchLater,
    MdThumbUp,
} from 'react-icons/md';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const list = [
    { title: 'Home', icon: <AiFillHome />, path: '/' },
    { title: 'Explore', icon: <MdExplore />, path: `'/'` },
    { title: 'Subscriptions', icon: <MdSubscriptions />, path: '/' },
    { title: 'Library', icon: <MdVideoLibrary />, path: '/' },
    { title: 'History', icon: <MdHistory />, path: '/' },
    { title: 'Your videos', icon: <MdOndemandVideo />, path: '/' },
    { title: 'Watch later', icon: <MdWatchLater />, path: '/' },
    { title: 'Liked videos', icon: <MdThumbUp />, path: '/' },
];

const Sidebar = () => {
    const { isMenuOpen } = useContext(AppContext);

    return (
        <nav
            className={
                !isMenuOpen ? styles.nav : `${styles.nav} ${styles.open}`
            }
        >
            <ul>
                {list.map(({ title, icon, path }) => {
                    return (
                        <li key={title}>
                            <Link to={path}>
                                {icon}
                                <p>{title}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Sidebar;
