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

const list = [
    { title: 'Home', icon: <AiFillHome /> },
    { title: 'Explore', icon: <MdExplore /> },
    { title: 'Subscriptions', icon: <MdSubscriptions /> },
    { title: 'Library', icon: <MdVideoLibrary /> },
    { title: 'History', icon: <MdHistory /> },
    { title: 'Your videos', icon: <MdOndemandVideo /> },
    { title: 'Watch later', icon: <MdWatchLater /> },
    { title: 'Liked videos', icon: <MdThumbUp /> },
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
                {list.map(({ title, icon }) => {
                    return (
                        <li key={title}>
                            {icon}
                            <p>{title}</p>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Sidebar;
