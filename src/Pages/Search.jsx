import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../components/Context';
import SearchVideo from '../components/SearchVideo';
import styles from './Search.module.css';
import SearchSkeletonVideo from '../components/skeletons/SearchSkeletonVideo';

const Search = () => {
    const { keyword } = useParams();
    const { fetchVideosBySearch, searchedVideos, isLoading } = useContext(
        AppContext
    );

    useEffect(() => {
        fetchVideosBySearch(keyword);
    }, [keyword]);

    return (
        <div className={styles.search}>
            <div className={styles.search__content}>
                <div className={styles.search__filter}>FILTER</div>
                <div>
                    {isLoading
                        ? [...new Array(20)].map(() => {
                              return <SearchSkeletonVideo />;
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
            </div>
        </div>
    );
};

export default Search;
