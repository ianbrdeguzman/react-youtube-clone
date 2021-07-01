import React, { createContext, useReducer } from 'react';
import request from '../components/shared/axios';

const LikedContext = createContext();

const initialState = {
    loading: false,
    videos: [],
    nextPageToken: null,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LIKED_VIDEOS_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'LIKED_VIDEOS_SUCCESS':
            return {
                ...state,
                loading: false,
                videos:
                    localStorage.getItem('accessToken') ===
                    action.payload.accessToken
                        ? [...state.videos, ...action.payload.videos]
                        : action.payload.videos,
                nextPageToken: action.payload.nextPageToken,
            };
        case 'LIKED_VIDEOS_FAIL':
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

const LikedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchLikedVideos = async () => {
        dispatch({ type: 'LIKED_VIDEOS_REQUEST' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    maxResults: 20,
                    myRating: 'like',
                    pageToken: state.nextPageToken,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        'accessToken'
                    )}`,
                },
            });

            dispatch({
                type: 'LIKED_VIDEOS_SUCCESS',
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                },
            });
        } catch (error) {
            dispatch({ type: 'LIKED_VIDEOS_FAIL', payload: error.message });
        }
    };

    return (
        <LikedContext.Provider value={{ ...state, fetchLikedVideos }}>
            {children}
        </LikedContext.Provider>
    );
};

export { LikedContext, LikedProvider };
