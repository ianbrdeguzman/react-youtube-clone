import React from 'react';
import styles from './SubscriptionsVideo.module.css';

const SubscriptionsVideo = () => {
    const handleOnChannelClick = () => {
        console.log('go to channel page');
    };

    const handleOnSubscribeClick = () => {
        console.log('subscribe...');
    };
    return (
        <div className={styles.subscription__channel}>
            <img
                src='https://yt3.ggpht.com/ytc/AAUvwnhuAGr98acrEv0S1Q3Ikz0giWPmHmM1J3h6pANWCg=s176-c-k-c0x00ffffff-no-rj-mo'
                alt=''
                onClick={handleOnChannelClick}
            />
            <div onClick={handleOnChannelClick}>
                <h4>Channel Title</h4>
                <p>665K subscribers • 613 videos</p>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Earum iste iusto accusamus sint quidem tenetur, magni
                    dolores! Ipsa laboriosam dolorum reiciendis esse laudantium
                    incidunt, officiis architecto voluptatum! Non labore neque
                    reiciendis nesciunt debitis asperiores dicta eos natus ex
                    sint molestiae possimus unde ducimus, similique enim quaerat
                    corrupti, officiis rerum amet.
                </p>
            </div>
            <button onClick={handleOnSubscribeClick}>SUBSCRIBED</button>
        </div>
    );
};

export default SubscriptionsVideo;
