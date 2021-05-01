import React from 'react';
import styles from './ChannelPlaylist.module.css';
import { MdPlaylistPlay } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

const ChannelPlaylist = () => {
    return (
        <div className={styles.channel__playlist}>
            {[...new Array(20)].map(() => {
                return (
                    <div
                        className={styles.channel__playlist__item}
                        key={uuidv4()}
                    >
                        <div>
                            <img
                                src='https://i.ytimg.com/vi/ENjrJ_zyeUc/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDEjWDP0qOQBlPGFKVMrNXap2qteA'
                                alt=''
                            />
                            <span>
                                <p>6</p>
                                <MdPlaylistPlay />
                            </span>
                        </div>
                        <h4>Justin Bieber - Hold On (Live from Paris)</h4>
                        <p>VIEW PLAYLIST</p>
                    </div>
                );
            })}
        </div>
    );
};

export default ChannelPlaylist;
