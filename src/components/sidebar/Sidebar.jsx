import React, { useContext } from 'react';
import styles from './Sidebar.module.css';
import { AiFillHome, AiFillGithub } from 'react-icons/ai';
import { MdSubscriptions, MdThumbUp } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { MenuContext } from '../../context/menuContext';

const list = [
    { title: 'Home', icon: <AiFillHome /> },
    { title: 'Subscriptions', icon: <MdSubscriptions /> },
    { title: 'Liked videos', icon: <MdThumbUp /> },
    { title: 'Github', icon: <AiFillGithub /> },
    { title: 'Sign out', icon: <RiLogoutBoxRLine /> },
];

const Sidebar = () => {
    const { signOut, accessToken, signInWithGoogle } = useContext(AuthContext);
    const { isMenuOpen } = useContext(MenuContext);

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
