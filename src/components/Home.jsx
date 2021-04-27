import React, { useContext, useEffect } from 'react';
import Video from './Video';
import CategoriesBar from './CategoriesBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AppContext } from './Context';
import styles from './Home.module.css';
import SkeletonVideo from './Skeleton';

const Home = () => {
    const {
        popularVideos,
        isLoading,
        activeCategory,
        fetchPopularVideos,
        fetchVideosByCategory,
        setActiveCategory,
    } = useContext(AppContext);

    const fetchVideos = (keyword) => {
        if (!activeCategory === keyword) {
            fetchVideosByCategory(keyword);
        } else {
            fetchPopularVideos();
        }
    };

    const handleOnClick = (keyword) => {
        console.log('clicked ', keyword);
        setActiveCategory(keyword);
    };

    // useEffect(() => {
    //     fetchPopularVideos();
    // }, []);

    // useEffect(() => {
    //     let isMounted = true;
    //     if (isMounted) fetchVideosByCategory(activeCategory);
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [activeCategory]);

    return (
        <section className={styles.home}>
            <CategoriesBar handleOnClick={handleOnClick} />
            <InfiniteScroll
                dataLength={popularVideos.length}
                next={fetchVideos}
                hasMore={true}
            >
                <div className={styles.home__videos}>
                    {isLoading
                        ? [...new Array(20)].map((item, index) => {
                              const id = new Date().getMilliseconds() + index;
                              return <SkeletonVideo key={id} />;
                          })
                        : popularVideos.map((video) => {
                              return <Video key={video.id} video={video} />;
                          })}
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default Home;
