import React, { useContext, useState } from 'react';
import styles from './Header.module.css';
import { useHistory, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import {
    MdMenu,
    MdSearch,
    MdVideoCall,
    MdApps,
    MdNotifications,
} from 'react-icons/md';
import { AuthContext } from '../../context/authContext';
import { MenuContext } from '../../context/menuContext';

const Header = () => {
    const [input, setInput] = useState('');

    const { isMenuOpen, dispatch } = useContext(MenuContext);
    const { userProfile, signInWithGoogle } = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.length === 0) return;
        history.push(`/search/${input}`);
    };

    const onMenuClick = () => {
        dispatch({ type: 'MENU_TOGGLE', payload: !isMenuOpen });
    };

    const handleIconsOnClick = () => {
        alert('Not yet implemented...');
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
                <button
                    type='submit'
                    onClick={handleSubmit}
                    aria-label='search'
                >
                    <MdSearch />
                </button>
            </form>
            <div className={styles.header__icons}>
                <MdVideoCall onClick={handleIconsOnClick} />
                <MdApps onClick={handleIconsOnClick} />
                <MdNotifications onClick={handleIconsOnClick} />
                {userProfile ? (
                    <img src={userProfile?.photoURL} alt='avatar' />
                ) : (
                    <FaUserCircle onClick={signInWithGoogle} />
                )}
            </div>
        </header>
    );
};

export default Header;
