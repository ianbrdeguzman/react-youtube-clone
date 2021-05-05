import React, { useContext } from 'react';
import { AppContext } from './context';
import { AiFillHome, AiFillGithub } from 'react-icons/ai';
import { MdSubscriptions, MdThumbUp } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import styles from './Sidebar.module.css';
import { useHistory } from 'react-router-dom';

const list = [
    { title: 'Home', icon: <AiFillHome /> },
    { title: 'Subscriptions', icon: <MdSubscriptions /> },
    { title: 'Liked videos', icon: <MdThumbUp /> },
    { title: 'Github', icon: <AiFillGithub /> },
    { title: 'Sign out', icon: <RiLogoutBoxRLine /> },
];

const Sidebar = () => {
    const { isMenuOpen, signOut, accessToken, signInWithGoogle } = useContext(
        AppContext
    );

    const history = useHistory();

    const handleOnClick = (title) => {
        switch (title) {
            case 'Home':
                history.push('/');
                break;
            case 'Subscriptions':
                accessToken
                    ? history.push('/feed/subscriptions')
                    : signInWithGoogle();
                break;
            case 'Liked videos':
                accessToken ? history.push('/feed/liked') : signInWithGoogle();
                break;
            case 'Github':
                window.location.href = 'https://github.com/ianbrdeguzman';
                break;
            case 'Sign out':
                signOut();
                history.push('/');
                break;
            default:
                break;
        }
    };

    return (
        <nav
            className={
                !isMenuOpen ? styles.nav : `${styles.nav} ${styles.open}`
            }
        >
            <ul>
                {list.map(({ title, icon }) => {
                    return (
                        <li key={title} onClick={() => handleOnClick(title)}>
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
