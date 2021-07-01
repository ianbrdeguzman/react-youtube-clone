import React, { createContext, useReducer } from 'react';
import request from '../helpers/axios';

const SearchContext = createContext();

const initialState = {
    loading: false,
    videos: [],
    keyword: '',
    nextPageToken: null,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_VIDEOS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'SEARCH_VIDEOS_SUCCESS':
            return {
                ...state,
                loading: false,
                videos:
                    state.keyword === action.payload.keyword
                        ? [...state.videos, ...action.payload.videos]
                        : action.payload.videos,
                keyword: action.payload.keyword,
                nextPageToken: action.payload.nextPageToken,
            };
        case 'SEARCH_VIDEOS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

const SearchProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchVideosBySearch = async (keyword) => {
        if (!state.nextPageToken) dispatch({ type: 'SEARCH_VIDEOS_REQUEST' });
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 10,
                    q: keyword,
                    type: 'video,channel',
                    pageToken: state.nextPageToken,
                },
            });
            dispatch({
                type: 'SEARCH_VIDEOS_SUCCESS',
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    keyword: keyword,
                },
            });
        } catch (error) {
            dispatch({ type: 'SEARCH_VIDEOS_FAIL', payload: error.message });
        }
    };

    return (
        <SearchContext.Provider value={{ ...state, fetchVideosBySearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
