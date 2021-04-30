import React, { useContext, useEffect } from 'react';
import HomeVideo from '../components/HomeVideo';
import CategoriesBar from '../components/CategoriesBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AppContext } from '../components/Context';
import styles from './Home.module.css';
import SkeletonVideo from '../components/skeletons/SkeletonVideo';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const {
        popularVideos,
        isLoading,
        activeCategory,
        fetchPopularVideos,
        fetchVideosByCategory,
    } = useContext(AppContext);

    const fetchMore = () => {
        console.log('uncomment to fetch more...');
        // if (activeCategory === 'All') {
        //     fetchPopularVideos();
        // } else {
        //     fetchVideosByCategory(activeCategory);
        // }
    };

    useEffect(() => {
        fetchPopularVideos();
    }, []);

    return (
        <section className={styles.home}>
            <CategoriesBar />
            <InfiniteScroll
                dataLength={popularVideos?.length}
                next={fetchMore}
                hasMore={true}
            >
                <div className={styles.home__videos}>
                    {isLoading
                        ? [...new Array(20)].map(() => {
                              return <SkeletonVideo key={uuidv4()} />;
                          })
                        : popularVideos?.map((video) => {
                              return <HomeVideo key={video.id} video={video} />;
                          })}
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default Home;
