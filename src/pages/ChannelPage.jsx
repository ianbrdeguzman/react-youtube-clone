import React, { useContext, useState } from 'react';
import styles from './ChannelPage.module.css';
import { useParams } from 'react-router-dom';
import { AppContext } from '../components/Context';
import ChannelVideos from '../components/ChannelVideos';
import ChannelPlaylist from '../components/ChannelPlaylist';
import ChannelAbout from '../components/ChannelAbout';

const ChannelPage = () => {
    const [selected, setSelected] = useState('VIDEOS');
    const { channelId } = useParams();
    const { fetchChannelDetails } = useContext(AppContext);

    const nav = ['VIDEOS', 'PLAYLIST', 'ABOUT'];

    const handleOnClick = (list) => {
        setSelected(list);
    };

    return (
        <div className={styles.container}>
            <div className={styles.channel__header}>
                <img
                    src='https://yt3.ggpht.com/ytc/AAUvwnh6xcaO5CpkIoi-4Vg7Ni9rTlre_twXi7_Bmii-5g=s88-c-k-c0x00ffffff-no-rj'
                    alt=''
                />
                <div>
                    <h2>Channel Title</h2>
                    <p>10K subsribers</p>
                </div>
                <button>SUBSCRIBE</button>
            </div>
            <ul className={styles.channel__nav}>
                {nav.map((list, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => handleOnClick(list)}
                            className={
                                selected === list ? styles.selected : undefined
                            }
                        >
                            {list}
                        </li>
                    );
                })}
            </ul>
            {selected === 'VIDEOS' ? (
                <ChannelVideos />
            ) : selected === 'PLAYLIST' ? (
                <ChannelPlaylist />
            ) : (
                <ChannelAbout />
            )}
        </div>
    );
};

export default ChannelPage;
