import React, { createContext, useReducer } from 'react';
import request from './axios';

const AppContext = createContext();

const defaultState = {
    isMenuOpen: false,
    popularVideos: [],
    nextPageToken: '',
    activeCategory: 'All',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU_TOGGLE':
            return { ...state, isMenuOpen: !action.payload };
        case 'SET_POPULAR_VIDEOS':
            return {
                ...state,
                popularVideos:
                    state.activeCategory === action.payload.category
                        ? [...state.popularVideos, ...action.payload.videos]
                        : action.payload.videos,
                nextPageToken: action.payload.token,
            };
        case 'SET_NEXT_PAGE_TOKEN':
            return { ...state, nextPageToken: action.payload };
        default:
            throw new Error('No action type found');
    }
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    const onMenuClick = () => {
        console.log('clicked');
        dispatch({ type: 'SET_MENU_TOGGLE', payload: state.isMenuOpen });
    };

    const fetchPopularVideos = async () => {
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
                type: 'SET_POPULAR_VIDEOS',
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

    const getVideosByCategory = (keyword) => async () => {
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
                type: 'SET_VID',
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    category: keyword,
                },
            });
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <AppContext.Provider
            value={{
                ...state,
                onMenuClick,
                fetchPopularVideos,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
