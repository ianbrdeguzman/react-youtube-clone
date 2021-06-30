import React, { createContext, useReducer } from 'react';
import request from '../components/shared/axios';

const HomeContext = createContext();

const initialState = {
    videos: [],
    nextPageToken: '',
    activeCategory: 'All',
    loading: false,
    error: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'HOME_VIDEO_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'HOME_VIDEO_SUCCESS':
            return {
                ...state,
                videos:
                    state.activeCategory === action.payload.activeCategory
                        ? [...state.videos, ...action.payload.videos]
                        : action.payload.videos,
                activeCategory: action.payload.activeCategory,
                nextPageToken: action.payload.nextPageToken,
                loading: false,
            };
        case 'HOME_VIDEO_FAIL':
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

const HomeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchHomeVideos = async () => {
        if (!state.nextPageToken) dispatch({ type: 'HOME_VIDEO_REQUEST' });
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
                type: 'HOME_VIDEO_SUCCESS',
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    activeCategory: state.activeCategory,
                },
            });
        } catch (error) {
            dispatch({ type: 'HOME_VIDEO_FAIL', payload: error.message });
        }
    };

    const fetchVideosByCategory = async (category) => {
        dispatch({ type: 'HOME_VIDEO_REQUEST' });
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    pageToken: state.nextPageToken,
                    q: category,
                    type: 'video',
                },
            });
            dispatch({
                type: 'HOME_VIDEO_SUCCESS',
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    activeCategory: category,
                },
            });
        } catch (error) {
            dispatch({ type: 'HOME_VIDEO_FAIL', payload: error.message });
        }
    };

    return (
        <HomeContext.Provider
            value={{ ...state, fetchHomeVideos, fetchVideosByCategory }}
        >
            {children}
        </HomeContext.Provider>
    );
};

export { HomeContext, HomeProvider };
