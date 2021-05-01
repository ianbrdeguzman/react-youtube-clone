import React, { createContext, useReducer } from 'react';
import request from './axios';

const AppContext = createContext();

const defaultState = {
    isMenuOpen: true,
    popularVideos: [],
    nextPageToken: '',
    activeCategory: 'All',
    isLoading: true,
    searchedVideos: [],
    watchVideo: '',
    watchVideoId: '',
    commentList: [],
    commentNextPageToken: '',
    relatedVideos: [],
    relatedVideosNextPageToken: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU_TOGGLE':
            return { ...state, isMenuOpen: !action.payload };
        case 'SET_ISLOADING':
            return { ...state, isLoading: true };
        case 'SET_HOME_VIDEOS':
            return {
                ...state,
                popularVideos:
                    state.activeCategory === action.payload.category
                        ? [...state.popularVideos, ...action.payload.videos]
                        : action.payload.videos,
                nextPageToken: action.payload.token,
                activeCategory: action.payload.category,
                isLoading: false,
            };
        case 'SET_SEARCHED_VIDEOS':
            return {
                ...state,
                searchedVideos: action.payload,
                isLoading: false,
            };
        case 'SET_WATCH_VIDEO':
            return {
                ...state,
                watchVideo: action.payload,
                watchVideoId: action.payload.watchVideoId,
                isLoading: false,
            };
        case 'SET_COMMENT_LIST':
            return {
                ...state,
                commentList:
                    state.watchVideoId === action.payload.watchVideoId
                        ? [...state.commentList, ...action.payload.commentList]
                        : action.payload.commentList,
                commentNextPageToken: action.payload.commentNextPageToken,
                // isLoading: false,
            };
        case 'SET_RELATED_VIDEOS':
            return {
                ...state,
                relatedVideos: action.payload.relatedVideos,
                relatedVideosNextPageToken:
                    action.payload.relatedVideosNextPageToken,
                isLoading: false,
            };
        default:
            throw new Error('No action type found');
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onMenuClick = () => {
        dispatch({ type: 'SET_MENU_TOGGLE', payload: state.isMenuOpen });
    };

    const fetchPopularVideos = async () => {
        if (!state.nextPageToken) dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    regionCode: 'US',
                    maxResults: 20,
                    pageToken: state.nextPageToken,
                },
            });
            dispatch({
                type: 'SET_HOME_VIDEOS',
                payload: {
                    videos: data.items,
                    token: data.nextPageToken,
                    category: 'All',
                },
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchVideosByCategory = async (keyword) => {
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    pageToken: state.nextPageToken,
                    q: keyword,
                    type: 'video',
                },
            });
            dispatch({
                type: 'SET_HOME_VIDEOS',
                payload: {
                    videos: data.items,
                    token: data.nextPageToken,
                    category: keyword,
                },
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchVideosBySearch = async (keyword) => {
        dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    q: keyword,
                    type: 'video,channel',
                },
            });
            dispatch({
                type: 'SET_SEARCHED_VIDEOS',
                payload: data.items,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const fetchVideoById = async (id) => {
        dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,statistics',
                    id: id,
                },
            });
            dispatch({
                type: 'SET_WATCH_VIDEO',
                payload: {
                    watchVideo: data.items[0],
                    watchVideoId: id,
                },
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchCommentsOfVideoById = async (id) => {
        // dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: id,
                    pageToken: state.commentNextPageToken,
                },
            });
            dispatch({
                type: 'SET_COMMENT_LIST',
                payload: {
                    commentList: data.items,
                    commentNextPageToken: data.nextPageToken,
                },
            });
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const fetchRelatedVideos = async (id) => {
        // dispatch({ type: 'SET_ISLOADING' });
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    relatedToVideoId: id,
                    maxResults: 20,
                    type: 'video',
                    pageToken: state.relatedVideosNextPageToken,
                },
            });
            dispatch({
                type: 'SET_RELATED_VIDEOS',
                payload: {
                    relatedVideos: data.items,
                    relatedVideosNextPageToken: data.nextPageToken,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                onMenuClick,
                fetchPopularVideos,
                fetchVideosByCategory,
                fetchVideosBySearch,
                fetchVideoById,
                fetchCommentsOfVideoById,
                fetchRelatedVideos,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
