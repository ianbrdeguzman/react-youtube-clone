import React, { useContext } from 'react';
import { AppContext } from './Context';
import styles from './Header.module.css';
import { FaUserCircle } from 'react-icons/fa';
import {
    MdMenu,
    MdSearch,
    MdVideoCall,
    MdApps,
    MdNotifications,
} from 'react-icons/md';

const Header = () => {
    const { onMenuClick } = useContext(AppContext);

    return (
        <header className={styles.header}>
            <div className={styles.header__menu}>
                <MdMenu onClick={onMenuClick} />
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
                    alt='logo'
                />
            </div>
            <form className={styles.header__form}>
                <input type='text' name='search' placeholder='Search' />
                <button type='submit'>
                    <MdSearch />
                </button>
            </form>
            <div className={styles.header__icons}>
                <MdVideoCall />
                <MdApps />
                <MdNotifications />
                <FaUserCircle />
            </div>
        </header>
    );
};

export default Header;
