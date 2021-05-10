import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/shared/context';
import styles from './styles/HomePage.module.css';
import HomeVideo from '../components/HomeVideo';
import CategoriesBar from '../components/CategoriesBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonVideo from '../components/skeletons/SkeletonVideo';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
    const {
        homeVideos,
        isLoading,
        activeCategory,
        fetchHomeVideos,
        fetchVideosByCategory,
    } = useContext(AppContext);

    const fetchMoreHomeVideos = () => {
        if (activeCategory === 'All') {
            fetchHomeVideos();
        } else {
            fetchVideosByCategory(activeCategory);
        }
    };

    useEffect(() => {
        fetchHomeVideos();
    }, []);

    return (
        <>
            <Helmet>
                <title>React | Youtube Clone</title>
            </Helmet>
            <section className={styles.home}>
                <CategoriesBar />
                <InfiniteScroll
                    dataLength={homeVideos?.length}
                    next={fetchMoreHomeVideos}
                    hasMore={true}
                >
                    <div className={styles.home__videos}>
                        {isLoading
                            ? [...new Array(20)].map(() => {
                                  return <SkeletonVideo key={uuidv4()} />;
                              })
                            : homeVideos?.map((video) => {
                                  return (
                                      <HomeVideo key={uuidv4()} video={video} />
                                  );
                              })}
                    </div>
                </InfiniteScroll>
            </section>
        </>
    );
};

export default HomePage;
