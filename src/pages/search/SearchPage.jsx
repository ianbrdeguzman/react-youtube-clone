import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../components/shared/context';
import styles from './SearchPage.module.css';
import SearchVideo from '../../components/search-video/SearchVideo';
import SkeletonSearchVideo from './skeleton/SkeletonSearchVideo';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';
import { SearchContext } from '../../context/searchContext';
import { filterArr } from '../../helpers/helpers';

const SearchPage = () => {
    const { keyword } = useParams();
    // const { fetchVideosBySearch, searchedVideos, isLoading } =
    //     useContext(AppContext);

    const { fetchVideosBySearch, videos, loading } = useContext(SearchContext);

    const filteredSearchedVideos = Array.from(
        new Set(videos?.map((video) => video.id.videoId))
    ).map((id) => {
        return {
            video: videos.find((video) => video.id.videoId === id),
        };
    });

    // const filteredVideos = filterArr(videos);

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
                        dataLength={filteredSearchedVideos?.length}
                        next={fetchMoreSearchVideos}
                        hasMore={true}
                    >
                        <div>
                            {loading
                                ? [...new Array(20)].map(() => {
                                      return (
                                          <SkeletonSearchVideo key={uuidv4()} />
                                      );
                                  })
                                : filteredSearchedVideos?.map(({ video }) => {
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
