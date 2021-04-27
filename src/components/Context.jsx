import React, { createContext, useReducer } from 'react';
import request from './axios';

const AppContext = createContext();

const defaultState = {
    isMenuOpen: true,
    popularVideos: [],
    nextPageToken: '',
    activeCategory: 'All',
    isLoading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU_TOGGLE':
            return { ...state, isMenuOpen: !action.payload };
        case 'SET_ISLOADING':
            return { ...state, isLoading: true };
        case 'SET_POPULAR_VIDEOS':
            return {
                ...state,
                popularVideos:
                    state.activeCategory === action.payload.category
                        ? [...state.popularVideos, ...action.payload.videos]
                        : action.payload.videos,
                nextPageToken: action.payload.token,
                isLoading: false,
            };
        case 'SET_ACTIVE_CATEGORY':
            return { ...state, activeCategory: action.payload };
        case 'SET_CATEGORY_VIDEOS':
            return {
                ...state,
                popularVideos: action.payload.videos,
                nextPageToken: action.payload.token,
                activeCategory: action.payload.category,
                isLoading: false,
            };
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

    const fetchVideosByCategory = async (keyword) => {
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    pageToken: state.nextPageToken,
                    q: keyword || 'All',
                    type: 'video',
                },
            });
            dispatch({
                type: 'SET_CATEGORY_VIDEOS',
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

    const setActiveCategory = (keyword) => {
        dispatch({ type: 'SET_ACTIVE_CATEGORY', payload: keyword });
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                onMenuClick,
                fetchPopularVideos,
                fetchVideosByCategory,
                setActiveCategory,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
