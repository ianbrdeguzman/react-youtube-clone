import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/context';
import styles from './SearchPage.module.css';
import SearchVideo from '../components/SearchVideo';
import SearchSkeletonVideo from '../components/skeletons/SearchSkeletonVideo';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';

const SearchPage = () => {
    const { keyword } = useParams();
    const { fetchVideosBySearch, searchedVideos, isLoading } = useContext(
        AppContext
    );

    const fetchMoreSearchVideos = () => {
        console.log('uncomment to fetch more searched videos...');
        // fetchVideosBySearch(keyword);
    };

    useEffect(() => {
        fetchVideosBySearch(keyword);
    }, [keyword]);

    return (
        <div className={styles.search}>
            <div className={styles.search__content}>
                <div className={styles.search__filter}>FILTER</div>
                <InfiniteScroll
                    dataLength={searchedVideos?.length}
                    next={fetchMoreSearchVideos}
                    hasMore={true}
                >
                    <div>
                        {isLoading
                            ? [...new Array(20)].map(() => {
                                  return <SearchSkeletonVideo key={uuidv4()} />;
                              })
                            : searchedVideos?.map((video) => {
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
    );
};

export default SearchPage;
