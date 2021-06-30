import React, { useContext, useEffect } from 'react';
import styles from './HomePage.module.css';
import HomeVideoList from '../../components/home-video-list/HomeVideoList';
import CategoriesBar from '../../components/categories-bar/CategoriesBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet-async';
import { HomeContext } from '../../context/homeContext';

const HomePage = () => {
    const { videos, activeCategory, fetchHomeVideos, fetchVideosByCategory } =
        useContext(HomeContext);

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
                    dataLength={videos?.length}
                    next={fetchMoreHomeVideos}
                    hasMore={true}
                >
                    <HomeVideoList />
                </InfiniteScroll>
            </section>
        </>
    );
};

export default HomePage;
