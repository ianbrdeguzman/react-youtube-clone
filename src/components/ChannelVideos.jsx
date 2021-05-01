import React from 'react';
import styles from './ChannelVideos.module.css';
import { v4 as uuidv4 } from 'uuid';

const ChannelVideos = () => {
    return (
        <div className={styles.channel__videos}>
            {[...new Array(20)].map(() => {
                return (
                    <div
                        className={styles.channel__videos__item}
                        key={uuidv4()}
                    >
                        <div>
                            <img
                                src='https://i.ytimg.com/vi/ENjrJ_zyeUc/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDEjWDP0qOQBlPGFKVMrNXap2qteA'
                                alt=''
                            />
                            <span>10:10</span>
                        </div>
                        <h4>Justin Bieber - Hold On (Live from Paris)</h4>
                        <p>Justin Beiber</p>
                        <p>4.5M views • 2 weeks ago</p>
                    </div>
                );
            })}
        </div>
    );
};

export default ChannelVideos;
