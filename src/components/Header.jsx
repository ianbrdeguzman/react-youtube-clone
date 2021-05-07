import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { AppContext } from './shared/context';
import styles from './styles/Header.module.css';
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
    const { onMenuClick, signInWithGoogle, userProfile } = useContext(
        AppContext
    );

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.length === 0) return;
        history.push(`/search/${input}`);
    };

    const handleSignInOnClick = () => {
        signInWithGoogle();
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
                {userProfile ? (
                    <img src={userProfile?.photoURL} alt='avatar' />
                ) : (
                    <FaUserCircle onClick={handleSignInOnClick} />
                )}
            </div>
        </header>
    );
};

export default Header;
