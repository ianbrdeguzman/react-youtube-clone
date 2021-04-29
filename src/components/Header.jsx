import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
    const [input, setInput] = useState('');
    const { onMenuClick } = useContext(AppContext);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${input}`);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header__menu}>
                <MdMenu onClick={onMenuClick} />
                <Link to='/'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
                        alt='logo'
                    />
                </Link>
            </div>
            <form className={styles.header__form}>
                <input
                    type='text'
                    name='search'
                    placeholder='Search'
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit' onClick={handleSubmit}>
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
