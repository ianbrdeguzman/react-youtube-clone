import React, { useContext } from 'react';
import styles from './HomeVideoList.module.css';
import HomeVideo from '../home-video/HomeVideo';
import SkeletonVideo from '../../pages/home/skeleton/SkeletonVideo';
import { HomeContext } from '../../context/homeContext';
import { filterArr } from '../../helpers/helpers';

const HomeVideoList = () => {
    const { videos, loading } = useContext(HomeContext);

    const filteredVideos = filterArr(videos);

    return (
        <div className={styles.home__videos}>
            {loading
                ? [...new Array(20)].map((_, i) => {
                      return <SkeletonVideo key={i} />;
                  })
                : filteredVideos?.map((video) => {
                      const id = video.id.videoId || video.id;
                      return <HomeVideo key={id} video={video} />;
                  })}
        </div>
    );
};

export default HomeVideoList;
