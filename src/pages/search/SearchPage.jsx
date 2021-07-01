import React, { useContext, useEffect } from 'react';
import styles from './SearchPage.module.css';
import SearchVideo from '../../components/search-video/SearchVideo';
import SkeletonSearchVideo from './skeleton/SkeletonSearchVideo';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from 'react-helmet-async';
import { SearchContext } from '../../context/searchContext';
import { filterArr } from '../../helpers/helpers';

const SearchPage = () => {
    const { keyword } = useParams();

    const { fetchVideosBySearch, videos, loading } = useContext(SearchContext);

    const filteredVideos = filterArr(videos);

    const fetchMoreSearchVideos = () => {
        fetchVideosBySearch(keyword);
    };

    useEffect(() => {
        fetchVideosBySearch(keyword);
    }, [keyword]);

    return (
        <>
            <Helmet>
                <title>{keyword} | Youtube Clone</title>
            </Helmet>
            <div className={styles.search}>
                <div className={styles.search__content}>
                    <div className={styles.search__filter}>FILTER</div>
                    <InfiniteScroll
                        dataLength={filteredVideos?.length}
                        next={fetchMoreSearchVideos}
                        hasMore={true}
                    >
                        <div>
                            {loading
                                ? [...new Array(20)].map((_, i) => {
                                      return <SkeletonSearchVideo key={i} />;
                                  })
                                : filteredVideos?.map((video) => {
                                      return (
                                          <SearchVideo
                                              key={video.id.videoId}
                                              video={video}
                                          />
                                      );
                                  })}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
