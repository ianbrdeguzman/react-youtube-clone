import React, { createContext, useReducer } from 'react';
import request from '../helpers/axios';

const VideoContext = createContext();

const initialState = {
    loading: false,
    relLoading: false,
    video: null,
    relatedVideos: [],
    id: null,
    categoryId: null,
    error: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'VIDEO_WATCH_REQUEST':
            return {
                ...state,
                loading: true,
            };
        case 'VIDEO_WATCH_SUCCESS':
            return {
                ...state,
                loading: false,
                video: action.payload.video,
                id: action.payload.id,
                categoryId: action.payload.categoryId,
            };
        case 'VIDEO_WATCH_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'VIDEO_RELATED_REQUEST':
            return {
                ...state,
                relLoading: true,
            };
        case 'VIDEO_RELATED_SUCCESS':
            return {
                ...state,
                relLoading: false,
                relatedVideos: action.payload,
            };
        case 'VIDEO_RELATED_FAIL':
            return {
                ...state,
                relLoading: false,
                error: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};

const VideoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchVideoById = async (id) => {
        dispatch({ type: 'VIDEO_WATCH_REQUEST' });
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,statistics',
                    id: id,
                },
            });
            dispatch({
                type: 'VIDEO_WATCH_SUCCESS',
                payload: {
                    video: data.items,
                    id: id,
                    categoryId: data.items[0].snippet.categoryId,
                },
            });
        } catch (error) {
            dispatch({ type: 'VIDEO_WATCH_FAIL', payload: error.message });
        }
    };

    const fetchRelatedVideos = async (id, categoryId) => {
        dispatch({ type: 'VIDEO_RELATED_REQUEST' });
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    relatedToVideoId: id,
                    maxResults: 10,
                    type: 'video',
                    videoCategoryId: categoryId || state.categoryId,
                },
            });
            dispatch({
                type: 'VIDEO_RELATED_SUCCESS',
                payload: data.items,
            });
        } catch (error) {
            dispatch({ type: 'VIDEO_RELATED_FAIL', payload: error.message });
        }
    };

    return (
        <VideoContext.Provider
            value={{ ...state, fetchVideoById, fetchRelatedVideos }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export { VideoContext, VideoProvider };
