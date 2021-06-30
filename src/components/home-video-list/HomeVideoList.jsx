import React, { useContext } from 'react';
import styles from './HomeVideoList.module.css';
import HomeVideo from '../home-video/HomeVideo';
import SkeletonVideo from '../../pages/home/skeleton/SkeletonVideo';
import { HomeContext } from '../../context/homeContext';

const HomeVideoList = () => {
    const { videos, loading } = useContext(HomeContext);

    return (
        <div className={styles.home__videos}>
            {loading
                ? [...new Array(20)].map((_, i) => {
                      return <SkeletonVideo key={i} />;
                  })
                : videos?.map((video) => {
                      const id = video.id.videoId || video.id;
                      return <HomeVideo key={id} video={video} />;
                  })}
        </div>
    );
};

export default HomeVideoList;
