import React, { useContext, useEffect } from 'react';
import styles from './HomePage.module.css';
import HomeVideoList from '../../components/home-video-list/HomeVideoList';
import CategoriesBar from '../../components/categories-bar/CategoriesBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet-async';
import { HomeContext } from '../../context/homeContext';
import { filterArr } from '../../helpers/helpers';
import firebase from '../../helpers/firebase';
import { AuthContext } from '../../context/authContext';

const HomePage = () => {
    const { videos, activeCategory, fetchHomeVideos, fetchVideosByCategory } =
        useContext(HomeContext);

    const { keepSignIn } = useContext(AuthContext);

    const fetchMoreHomeVideos = () => {
        if (activeCategory === 'All') {
            fetchHomeVideos();
        } else {
            fetchVideosByCategory(activeCategory);
        }
    };

    const filteredVideos = filterArr(videos);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        fetchHomeVideos();
    }, []);

    useEffect(() => {
        if (user) {
            keepSignIn(user);
        }
    }, [user]);

    return (
        <>
            <Helmet>
                <title>React | Youtube Clone</title>
            </Helmet>
            <section className={styles.home}>
                <CategoriesBar />
                <InfiniteScroll
                    dataLength={filteredVideos?.length}
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
